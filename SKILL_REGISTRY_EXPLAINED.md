# Le Registre des 505 Skills — Comment ça marche

## 🧬 Architecture en 4 couches

```
AndroidLauncher.getClasses()     ← Android-spécifique (DexFile scan)
        ↓
ClassFinder.getClasses(package)  ← Façade, délègue à INative
        ↓
CombatSkillHelper.<init>()       ← LE REGISTRE : 647 appels addMapping()
        ↓
CombatSkillHelper.getCombatSkill() ← Factory : Class.newInstance()
```

## 🔍 Comment fonctionne le registre actuel (Android)

### Étape 1 : Le Constructeur-Registre (2212 instructions bytecode !)

Le constructeur de `CombatSkillHelper` est un fichier **monstre** qui fait 647 appels `addMapping()` un par un. Voici le pattern répété 647 fois :

```java
// Pattern simple (505 skills normaux) :
addMapping(SkillType.ELECTROYETI_0, ElectroyetiSkill0.class);
addMapping(SkillType.ELECTROYETI_1, ElectroyetiSkill1.class);
addMapping(SkillType.MEDUSA_0, MedusaSkill0.class);
// ...

// Pattern avec données (142 skills stat-boost) :
addMapping(SkillType.ELECTROYETI_4, StatBoostSkill.class, 
           new StatBoostData(StatType.MAGIC_POWER));
```

### Étape 2 : Le Stockage

Les mappings sont stockés dans une `EnumMap<SkillType, SkillInfo>` :

```java
class SkillInfo {
    Class<? extends CombatSkill> clazz;  // La classe du skill
    Object data;                          // Données optionnelles (pour StatBoost)
}
```

### Étape 3 : L'Instanciation (la seule reflection)

Quand le combat crée un skill :

```java
// getCombatSkill(unit, skillType, level)
SkillInfo info = mappings.get(skillType);  // Lookup dans l'EnumMap
CombatSkill skill = info.clazz.newInstance();  // ⚠️ REFLECTION ICI
skill.setData(info.data);
skill.initialize(unit, skillType, level);
return skill;
```

**C'est la seule ligne de reflection critique** : `Class.newInstance()` sur une classe déjà connue.

### Étape 4 : L'autre reflection (ClassFinder)

`ClassFinder.getClasses(packageName)` est utilisé UNIQUEMENT pour le scan de packages au démarrage. Sur Android, il utilise `DexFile.entries()` pour lister les classes du APK — **ce mécanisme n'existe PAS sur d'autres plateformes**.

Cependant, `ClassFinder` n'est PAS utilisé pour les skills ! Les skills sont tous enregistrés manuellement dans le constructeur. `ClassFinder` est utilisé pour d'autres choses (probablement les messages réseau).

## 🎯 Impact pour le portage web

### Avec GWT (pas de reflection)

Il faut **remplacer `Class.newInstance()`** dans `getCombatSkill()`. Solution :

```java
// Remplacer la map Class → instance par une map SkillType → Supplier
EnumMap<SkillType, Supplier<CombatSkill>> factories = new EnumMap<>(...);

// Dans le constructeur :
factories.put(SkillType.ELECTROYETI_0, ElectroyetiSkill0::new);
factories.put(SkillType.ELECTROYETI_1, ElectroyetiSkill1::new);
// ...

// Dans getCombatSkill :
CombatSkill skill = factories.get(skillType).get();  // Plus de reflection !
```

**Travail concret :** Modifier UN fichier (`CombatSkillHelper.java`) et faire un rechercher/remplacer pour transformer les 647 appels `addMapping(type, Class)` en `addMapping(type, Class::new)`.

C'est **15 minutes de travail** avec une regex, pas 1 semaine !

### Avec TeaVM (reflection partielle)

TeaVM supporte `Class.newInstance()` via son mécanisme de reflection partielle. Comme toutes les classes sont référencées par `const-class` dans le constructeur, TeaVM les inclurait automatiquement dans le build.

**Travail concret :** ZÉRO modification. Le code existant fonctionnerait tel quel.

### Et ClassFinder.getClasses() ?

`ClassFinder` utilise `DexFile` sur Android et `ClassLoader.getResources()` en fallback (mode desktop). Sur le web :
- **GWT** : Pas de ClassLoader → il faut remplacer par une liste statique des packages
- **TeaVM** : Support limité de ClassLoader → peut marcher ou non

Mais c'est un problème **séparé** des skills, et probablement mineur (< 5 usages dans tout le code).

## 📊 Chiffres clés

| Métrique | Valeur |
|---|---|
| Appels addMapping | 647 |
| Skills uniques (top-level) | 505 |
| Inner classes (buffs, etc.) | 641 |
| Total classes simulation/skills | 1148 |
| Héros/personnages uniques | 123 |
| Fichiers à modifier (GWT) | **1 seul** (CombatSkillHelper) |
| Fichiers à modifier (TeaVM) | **0** |
| Instructions bytecode du constructeur | 2212 |

## 🏆 Conclusion

Le "registre des 505 skills" n'est PAS un problème complexe. C'est un **constructeur géant mais mécanique** qui utilise une seule forme de reflection (`Class.newInstance()`). La solution GWT est un remplacement regex de 15 minutes, et TeaVM n'a même pas besoin de modification.
