"""
DragonSoul Server Emulator - Turn-based Combat Simulation
Simple combat engine for campaign battles and PvP.
"""

import random
import logging

logger = logging.getLogger("combat")


def _make_combatant(unit, team_id):
    """Create a combatant dict from a hero or NPC dict."""
    return {
        "name": unit.get("name", "Unknown"),
        "team": team_id,
        "role": unit.get("role", "dps"),
        "hp": unit.get("health", 1000),
        "max_hp": unit.get("health", 1000),
        "atk": unit.get("attack", 100),
        "armor": unit.get("armor", 30),
        "magic_resist": unit.get("magic_resist", 20),
        "intellect": unit.get("intellect", 50),
        "speed": unit.get("speed", 50),
        "energy": 0,
        "alive": True,
    }


def simulate_battle(attacker_heroes, defender_heroes):
    """
    Run a turn-based combat simulation.

    Args:
        attacker_heroes: list of hero stat dicts (from get_hero_stats or NPC dicts)
        defender_heroes: list of defender stat dicts

    Returns:
        (won: bool, battle_log: list of log entry strings)
    """
    # Build combatants
    attackers = [_make_combatant(h, 0) for h in attacker_heroes]
    defenders = [_make_combatant(h, 1) for h in defender_heroes]
    all_units = attackers + defenders

    log = []
    turn = 0
    max_turns = 100

    while turn < max_turns:
        turn += 1

        # Sort by speed (descending), alive only
        alive_units = [u for u in all_units if u["alive"]]
        alive_units.sort(key=lambda u: u["speed"], reverse=True)

        if not alive_units:
            break

        for unit in alive_units:
            if not unit["alive"]:
                continue

            # Determine enemy team
            if unit["team"] == 0:
                enemies = [u for u in defenders if u["alive"]]
            else:
                enemies = [u for u in attackers if u["alive"]]

            allies = [u for u in all_units if u["alive"] and u["team"] == unit["team"] and u is not unit]

            if not enemies:
                break

            # Healers heal lowest HP ally (or self) instead of attacking
            if unit["role"] == "healer":
                # Heal lowest HP ally
                heal_targets = [u for u in all_units if u["alive"] and u["team"] == unit["team"]]
                if heal_targets:
                    target = min(heal_targets, key=lambda u: u["hp"] / max(u["max_hp"], 1))
                    heal_amount = max(1, unit["intellect"] // 2)
                    target["hp"] = min(target["max_hp"], target["hp"] + heal_amount)
                    log.append(
                        f"T{turn}: {unit['name']} heals {target['name']} for {heal_amount} HP"
                    )
                    unit["energy"] = min(100, unit["energy"] + 20)
                    continue

            # Pick target: enemy with lowest HP
            target = min(enemies, key=lambda u: u["hp"])

            # Check for ultimate (energy >= 100)
            is_ultimate = unit["energy"] >= 100
            damage_mult = 3 if is_ultimate else 1

            # Calculate damage
            raw_damage = unit["atk"] * damage_mult
            damage = max(1, raw_damage - target["armor"])

            # Critical hit: 15% chance, 2x damage
            is_crit = random.random() < 0.15
            if is_crit:
                damage *= 2

            target["hp"] -= damage

            # Log the action
            action = "ULTIMATE" if is_ultimate else "attacks"
            crit_text = " (CRIT!)" if is_crit else ""
            log.append(
                f"T{turn}: {unit['name']} {action} {target['name']} for {damage} damage{crit_text}"
            )

            # Energy management
            if is_ultimate:
                unit["energy"] = 0
            else:
                unit["energy"] = min(100, unit["energy"] + 20)

            # Target takes energy gain from being hit
            target["energy"] = min(100, target["energy"] + 10)

            # Check if target died
            if target["hp"] <= 0:
                target["alive"] = False
                log.append(f"T{turn}: {target['name']} is defeated!")

        # Check win conditions
        attacker_alive = any(u["alive"] for u in attackers)
        defender_alive = any(u["alive"] for u in defenders)

        if not defender_alive:
            log.append(f"Battle won in {turn} turns!")
            return True, log
        if not attacker_alive:
            log.append(f"Battle lost in {turn} turns.")
            return False, log

    # Timeout - defender wins
    log.append(f"Battle timed out after {max_turns} turns. Defender wins.")
    return False, log


def calculate_drops(chapter, level, won):
    """
    Calculate rewards for a campaign battle.
    Returns a dict with gold, xp, hero_xp, and possible item drops.
    
    Reward scaling (based on original DragonSoul values):
    - Chapter 0: 150-530 gold, 60-240 XP per level
    - Chapter 1+: scales up significantly
    """
    if not won:
        return {"gold": 0, "xp": 0, "hero_xp": 0, "items": []}

    # Gold: base 150, scales with chapter and level
    base_gold = 150 + 200 * chapter + 20 * level
    # Add some randomness (±20%)
    gold = int(base_gold * (0.8 + random.random() * 0.4))

    # Team XP: base 60, scales with chapter and level
    base_xp = 60 + 100 * chapter + 10 * level
    xp = int(base_xp * (0.9 + random.random() * 0.2))

    # Hero XP: heroes in the lineup get XP from combat
    # Original game gives ~100-500 hero XP per campaign level
    hero_xp = 100 + 50 * chapter + 25 * level

    # Random item drops (50% chance for 1 item, 15% chance for 2)
    items = []
    if random.random() < 0.50:
        item_id = random.randint(1, 20)
        items.append(item_id)
    if random.random() < 0.15:
        item_id = random.randint(1, 20)
        items.append(item_id)

    return {
        "gold": gold,
        "xp": xp,
        "hero_xp": hero_xp,
        "items": items,
    }
