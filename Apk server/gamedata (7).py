"""
DragonSoul Server Emulator - Game Data
Hero definitions, items, campaign chapters, XP tables, and stat calculations.
Uses actual UnitType enum ordinals from the APK.
"""

# ─── UnitType Enum Ordinals (from APK bytecode) ──────────────────────────────
# These MUST match com.perblue.rpg.network.messages.UnitType

# Client UnitType enum ordinals (from game-bytecode.jar, NOT alphabetical)
UNIT_TYPE = {
    "DEFAULT": 0,
    "ELECTROYETI": 1,
    "MEDUSA": 2,
    "FAITH_HEALER": 3,
    "DARK_DRACUL": 4,
    "COSMIC_ELF": 5,
    "ROLLER_WARRIOR": 6,
    "DRAGON_LADY": 7,
    "CENTAUR_OF_ATTENTION": 8,
    "UNSTABLE_UNDERSTUDY": 9,
    "MOON_DRAKE": 10,
    "NPC_GOBLIN": 11,
    "NPC_WILDLING_ARCHER": 12,
    "NPC_CRYSTAL_GOLEM": 13,
    "NPC_ICE_GOLEM": 14,
    "NPC_FIRE_IMP": 15,
    "NPC_STONE_IMP": 16,
    "NPC_MYSTIC_WILDLING": 17,
    "NPC_WILDLING_SNIPER": 18,
    "POLEMASTER": 19,
    "CATAPULT_KNIGHT": 20,
    "BARDBARIAN": 21,
    "SHADOW_ASSASSIN": 22,
    "DUST_DEVIL": 23,
    "SNAP_DRAGON": 24,
    "HYDRA": 25,
    "SAVAGE_CUTIE": 26,
    "ZOMBIE_SQUIRE": 27,
    "MAGIC_DRAGON": 28,
    "AQUATIC_MAN": 29,
    "CRIMSON_WITCH": 30,
    "NINJA_DWARF": 31,
    "BROZERKER": 32,
    "GROOVY_DRUID": 33,
    "BONE_DRAGON": 34,
    "NPC_INFERNO_SPIDER": 35,
    "NPC_HEALER_SPRITE": 36,
    "NPC_BUFF_SPRITE": 37,
    "NPC_TROLL_BLOB": 38,
    "NPC_SCARECROW": 39,
    "NPC_POTTED_PLANT": 40,
    "SPIKEY_DRAGON": 41,
    "FROST_GIANT": 42,
    "MINOTAUR": 43,
    "DARK_HORSE": 44,
    "DRUIDINATRIX": 45,
    "NPC_KAMIKAZE_GNOME": 46,
    "NPC_MR_SMASHY": 47,
    "TITAN_BUFF": 48,
    "NPC_EVIL_WIZARD": 49,
    "NPC_GIANT_PLANT": 50,
    "NPC_GOLD_COLOSSUS": 51,
    "ORC_MONK": 52,
    "DWARVEN_ARCHER": 53,
    "RABID_DRAGON": 54,
    "NPC_CAULDRON_MONSTER": 55,
    "NPC_SQUID": 56,
    "NPC_GIANT_PLANT_ROOT": 57,
    "SKELETON_KING": 58,
    "SATYR": 59,
    "STORM_DRAGON": 60,
    "NPC_SKELETON_DEER": 61,
    "NPC_MUSHROOM": 62,
    "UNICORGI": 63,
    "SNIPER_WOLF": 64,
    "GENIE": 65,
    "NPC_HEAD_CRAB": 66,
    "NPC_CLOUD_MONSTER": 67,
    "DRAGZILLA": 68,
    "PIRATE": 69,
    "CYCLOPS_WIZARD": 70,
    "DEMON_TOTEM": 71,
    "NPC_EYEBALL": 72,
    "NPC_TEST_DUMMY": 73,
    "DEEP_DRAGON": 74,
    "DOPPELGANGER": 75,
    "KRAKEN_KING": 76,
    "STOWAWAY": 77,
    "NPC_SHARK": 78,
    "NPC_SQUIRREL": 79,
    "CURSED_STATUE": 80,
    "PLANT_SOUL": 81,
    "SPIDER_QUEEN": 82,
    "VULTURE_DRAGON": 83,
    "NPC_ANT": 84,
    "BANSHEE": 85,
    "RAGING_REVENANT": 86,
    "SILENT_SPIRIT": 87,
    "SPECTRAL_DRAGON": 88,
    "NPC_LYING_LANTERN": 89,
    "WEREDRAGON": 90,
    "WEE_WITCH": 91,
    "DUNGEON_MAN": 92,
    "NPC_PLAGUE_SKULKER": 93,
    "PLAGUE_ENTREPRENEUR": 94,
    "MISTRESS_MANICURE": 95,
    "VILE_BILE": 96,
    "NPC_FLEA_DEMON": 97,
    "VOID_WYVERN": 98,
    "BURNT_ONE": 99,
    "NPC_ANGELIC_AVENGER": 100,
    "NPC_GENIE_COW": 101,
    "NPC_GENIE_GOAT": 102,
    "NPC_GENIE_CHICKEN": 103,
    "TOMB_ANGEL": 104,
    "ANGELIC_HERALD": 105,
    "BULWARK_ANGEL": 106,
    "ANGEL_DRAGON": 107,
    "DRAGON_SLAYER": 108,
    "ETERNAL_ENCHANTER": 109,
    "GRAND_HUNTRESS": 110,
    "TRIPLE_THREAT": 111,
    "LAST_DEFENDER": 112,
    "SOJOURNER_SORCERESS": 113,
    "KARAOKE_KING": 114,
    "SHADOW_OF_SVEN": 115,
    "SUN_SEEKER": 116,
    "STEPLADDER_BROTHERS": 117,
    "FORGOTTEN_DRAGON": 118,
    "NPC_CRYSTAL_LIZARD": 119,
    "BLACK_WING": 120,
    "GREED_DRAGON": 121,
    "UNRIPE_MYTHOLOGY": 122,
    "NPC_BREAKER_MKII": 123,
    "ANCIENT_DWARF": 124,
    "DIGGER_MOLE": 125,
    "SADISTIC_DANCER": 126,
    "NPC_ANUBIS_DRAGON": 127,
    "NPC_KING_IMP": 128,
    "WHITE_TIGRESS": 129,
    "SNAPPER_BONE": 130,
    "VERMILION_PRIESTESS": 131,
    "NPC_ABYSS_DRAGON": 132,
    "NPC_BOSS_ANUBIS_DRAGON": 133,
    "PCH_ANUBIS_DRAGON": 134,
    "ABYSS_DRAGON": 135,
    "UMLAUT_THE_FIRST": 136,
    "NPC_UMLAUT_THE_FIFTH_FIRST": 137,
    "NPC_BOSS_ABYSS_DRAGON": 138,
    "NPC_BOSS_ANDRAGONUS_THE_FIRST": 139,
    "NPC_BOSS_UMLAUT_THE_FIFTH_FIRST": 140,
    "NPC_SINISTER_ASSAILANT": 141,
    "NPC_RED_TIGER": 142,
    "DARK_HERO": 143,
    "CLAW_MAN": 144,
}

# ─── SkillType Enum Ordinals (from APK: com.perblue.rpg.network.messages.SkillType) ──────
# Maps unit_type_ordinal -> {skill_index: SkillType_ordinal}
# skill_0 = auto-attack (DEFAULT), skill_1 = WHITE, skill_2 = GREEN, etc.
HERO_SKILL_ORDINALS = {
    1: {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 281},  # ELECTROYETI
    2: {0: 6, 1: 7, 2: 8, 3: 9, 4: 10, 5: 249, 6: 599},  # MEDUSA
    3: {0: 11, 1: 12, 2: 13, 3: 14, 4: 15, 5: 251},  # FAITH_HEALER
    4: {0: 16, 1: 17, 2: 18, 3: 19, 4: 20, 5: 253},  # DARK_DRACUL
    5: {0: 21, 1: 22, 2: 23, 3: 24, 4: 25, 5: 288, 6: 643},  # COSMIC_ELF
    6: {0: 26, 1: 27, 2: 28, 3: 29, 4: 30, 5: 291, 6: 645},  # ROLLER_WARRIOR
    7: {0: 31, 1: 32, 2: 33, 3: 34, 4: 35, 5: 279, 6: 601},  # DRAGON_LADY
    8: {0: 36, 1: 37, 2: 38, 3: 39, 4: 40, 5: 278, 6: 603},  # CENTAUR_OF_ATTENTION
    9: {0: 41, 1: 42, 2: 43, 3: 44, 4: 45, 5: 283, 6: 657},  # UNSTABLE_UNDERSTUDY
    10: {0: 46, 1: 47, 2: 48, 3: 49, 4: 50, 5: 290},  # MOON_DRAKE
    19: {0: 61, 1: 62, 2: 63, 3: 64, 4: 65, 5: 252},  # POLEMASTER
    20: {0: 66, 1: 67, 2: 68, 3: 69, 4: 70, 5: 254},  # CATAPULT_KNIGHT
    21: {0: 71, 1: 72, 2: 73, 3: 74, 4: 75, 5: 285},  # BARDBARIAN
    22: {0: 76, 1: 77, 2: 78, 3: 79, 4: 80, 5: 280, 6: 646},  # SHADOW_ASSASSIN
    23: {0: 81, 1: 82, 2: 83, 3: 84, 4: 85, 5: 250},  # DUST_DEVIL
    24: {0: 86, 1: 87, 2: 88, 3: 89, 4: 90, 5: 256, 6: 659},  # SNAP_DRAGON
    25: {0: 91, 1: 92, 2: 93, 3: 94, 4: 95, 5: 284},  # HYDRA
    26: {0: 96, 1: 97, 2: 98, 3: 99, 4: 100, 5: 286},  # SAVAGE_CUTIE
    27: {0: 101, 1: 102, 2: 103, 3: 104, 4: 105, 5: 275},  # ZOMBIE_SQUIRE
    28: {0: 106, 1: 107, 2: 108, 3: 109, 4: 110, 5: 276},  # MAGIC_DRAGON
    29: {0: 111, 1: 112, 2: 113, 3: 114, 4: 115, 5: 289},  # AQUATIC_MAN
    30: {0: 116, 1: 117, 2: 118, 3: 119, 4: 120, 5: 444},  # CRIMSON_WITCH
    31: {0: 121, 1: 122, 2: 123, 3: 124, 4: 125, 5: 255, 6: 656},  # NINJA_DWARF
    32: {0: 126, 1: 127, 2: 128, 3: 129, 4: 130, 5: 248, 6: 642},  # BROZERKER
    33: {0: 131, 1: 132, 2: 133, 3: 134, 4: 135, 5: 277},  # GROOVY_DRUID
    34: {0: 136, 1: 137, 2: 138, 3: 139, 4: 140, 5: 389},  # BONE_DRAGON
    41: {0: 148, 1: 149, 2: 150, 3: 151, 4: 152, 5: 445},  # SPIKEY_DRAGON
    42: {0: 153, 1: 154, 2: 155, 3: 156, 4: 157, 5: 282},  # FROST_GIANT
    43: {0: 158, 1: 159, 2: 160, 3: 161, 4: 162, 5: 443},  # MINOTAUR
    44: {0: 163, 1: 164, 2: 165, 3: 166, 4: 167, 5: 432},  # DARK_HORSE
    45: {0: 168, 1: 169, 2: 170, 3: 171, 4: 172, 5: 292},  # DRUIDINATRIX
    52: {0: 192, 1: 193, 2: 194, 3: 195, 4: 196, 5: 287, 6: 644},  # ORC_MONK
    53: {0: 197, 1: 198, 2: 199, 3: 200, 4: 201, 5: 426},  # DWARVEN_ARCHER
    54: {0: 202, 1: 203, 2: 204, 3: 205, 4: 206, 5: 388},  # RABID_DRAGON
    58: {0: 229, 1: 230, 2: 231, 3: 232, 4: 233, 5: 438},  # SKELETON_KING
    59: {0: 234, 1: 235, 2: 236, 3: 237, 4: 238, 5: 439, 6: 602},  # SATYR
    60: {0: 239, 1: 240, 2: 241, 3: 242, 4: 243, 5: 441},  # STORM_DRAGON
    63: {0: 257, 1: 258, 2: 259, 3: 260, 4: 261, 5: 424},  # UNICORGI
    64: {0: 262, 1: 263, 2: 264, 3: 265, 4: 266, 5: 390},  # SNIPER_WOLF
    65: {0: 267, 1: 268, 2: 269, 3: 270, 4: 271, 5: 446, 6: 600},  # GENIE
    68: {0: 293, 1: 294, 2: 295, 3: 296, 4: 297, 5: 553},  # DRAGZILLA
    69: {0: 298, 1: 299, 2: 300, 3: 301, 4: 302, 5: 425},  # PIRATE
    70: {0: 303, 1: 304, 2: 305, 3: 306, 4: 307},  # CYCLOPS_WIZARD
    71: {0: 308, 1: 309, 2: 310, 3: 311, 4: 312, 5: 447, 6: 660},  # DEMON_TOTEM
    74: {0: 314, 1: 315, 2: 316, 3: 317, 4: 318, 5: 440, 6: 658},  # DEEP_DRAGON
    75: {0: 319, 1: 320, 2: 321, 3: 322, 4: 323},  # DOPPELGANGER
    76: {0: 324, 1: 325, 2: 326, 3: 327, 4: 328},  # KRAKEN_KING
    77: {0: 329, 1: 330, 2: 331, 3: 332, 4: 333},  # STOWAWAY
    80: {0: 337, 1: 338, 2: 339, 3: 340, 4: 341},  # CURSED_STATUE
    81: {0: 342, 1: 343, 2: 344, 3: 345, 4: 346},  # PLANT_SOUL
    82: {0: 347, 1: 348, 2: 349, 3: 350, 4: 351},  # SPIDER_QUEEN
    83: {0: 352, 1: 353, 2: 354, 3: 355, 4: 356, 5: 651},  # VULTURE_DRAGON
    85: {0: 365, 1: 366, 2: 367, 3: 368, 4: 369},  # BANSHEE
    86: {0: 370, 1: 371, 2: 372, 3: 373, 4: 374, 5: 575},  # RAGING_REVENANT
    87: {0: 375, 1: 376, 2: 377, 3: 378, 4: 379},  # SILENT_SPIRIT
    88: {0: 380, 1: 381, 2: 382, 3: 383, 4: 384},  # SPECTRAL_DRAGON
    90: {0: 391, 1: 392, 2: 393, 3: 394, 4: 395, 5: 647},  # WEREDRAGON
    91: {0: 396, 1: 397, 2: 398, 3: 399, 4: 400},  # WEE_WITCH
    92: {0: 401, 1: 402, 2: 403, 3: 404, 4: 405},  # DUNGEON_MAN
    94: {0: 408, 1: 409, 2: 410, 3: 411, 4: 412},  # PLAGUE_ENTREPRENEUR
    95: {0: 413, 1: 414, 2: 415, 3: 416, 4: 417},  # MISTRESS_MANICURE
    96: {0: 418, 1: 419, 2: 420, 3: 421, 4: 422},  # VILE_BILE
    98: {0: 427, 1: 428, 2: 429, 3: 430, 4: 431},  # VOID_WYVERN
    99: {0: 433, 1: 434, 2: 435, 3: 436, 4: 437},  # BURNT_ONE
    104: {0: 448, 1: 449, 2: 450, 3: 451, 4: 452},  # TOMB_ANGEL
    105: {0: 453, 1: 454, 2: 455, 3: 456, 4: 457, 5: 613},  # ANGELIC_HERALD
    106: {0: 458, 1: 459, 2: 460, 3: 461, 4: 462},  # BULWARK_ANGEL
    107: {0: 463, 1: 464, 2: 465, 3: 466, 4: 467},  # ANGEL_DRAGON
    108: {0: 468, 1: 469, 2: 470, 3: 471, 4: 472},  # DRAGON_SLAYER
    109: {0: 473, 1: 474, 2: 475, 3: 476, 4: 477, 5: 532},  # ETERNAL_ENCHANTER
    110: {0: 478, 1: 479, 2: 480, 3: 481, 4: 482},  # GRAND_HUNTRESS
    111: {0: 483, 1: 484, 2: 485, 3: 486, 4: 487},  # TRIPLE_THREAT
    112: {0: 488, 1: 489, 2: 490, 3: 491, 4: 492},  # LAST_DEFENDER
    113: {0: 494, 1: 495, 2: 496, 3: 497, 4: 498, 5: 499},  # SOJOURNER_SORCERESS
    114: {0: 500, 1: 501, 2: 502, 3: 503, 4: 504},  # KARAOKE_KING
    115: {0: 506, 1: 507, 2: 508, 3: 509, 4: 510},  # SHADOW_OF_SVEN
    116: {0: 512, 1: 513, 2: 514, 3: 515, 4: 516},  # SUN_SEEKER
    117: {0: 518, 1: 519, 2: 520, 3: 521, 4: 522},  # STEPLADDER_BROTHERS
    118: {0: 524, 1: 525, 2: 526, 3: 527, 4: 528},  # FORGOTTEN_DRAGON
    120: {0: 533, 1: 534, 2: 535, 3: 536, 4: 537},  # BLACK_WING
    121: {0: 539, 1: 540, 2: 541, 3: 542, 4: 543},  # GREED_DRAGON
    122: {0: 545, 1: 546, 2: 547, 3: 548, 4: 549},  # UNRIPE_MYTHOLOGY
    124: {0: 554, 1: 555, 2: 556, 3: 557, 4: 558},  # ANCIENT_DWARF
    125: {0: 560, 1: 561, 2: 562, 3: 563, 4: 564},  # DIGGER_MOLE
    126: {0: 566, 1: 567, 2: 568, 3: 569, 4: 570},  # SADISTIC_DANCER
    129: {0: 578, 1: 579, 2: 580, 3: 581, 4: 582},  # WHITE_TIGRESS
    130: {0: 584, 1: 585, 2: 586, 3: 587, 4: 588},  # SNAPPER_BONE
    131: {0: 604, 1: 605, 2: 606, 3: 607, 4: 608},  # VERMILION_PRIESTESS
    134: {0: 618, 1: 619, 2: 620, 3: 621, 4: 622},  # PCH_ANUBIS_DRAGON
    135: {0: 624, 1: 625, 2: 626, 3: 627, 4: 628},  # ABYSS_DRAGON
    136: {0: 630, 1: 631, 2: 632, 3: 633, 4: 634},  # UMLAUT_THE_FIRST
    143: {0: 665, 1: 666, 2: 667, 3: 668, 4: 669},  # DARK_HERO
    144: {0: 671, 1: 672, 2: 673, 3: 674},  # CLAW_MAN
}

# Hero data: name, starting stars (from unitstats.tab)
# FILTERED: Only heroes with complete local Spine assets (atlas+skel+etc1)
# 14 heroes with assets in assets/ETC/XHDPI/world/units/
HEROES = {
    UNIT_TYPE["BROZERKER"]:             {"name": "Brozerker",             "stars": 3},
    UNIT_TYPE["CENTAUR_OF_ATTENTION"]:  {"name": "Centaur of Attention",  "stars": 1},
    UNIT_TYPE["COSMIC_ELF"]:            {"name": "Cosmic Elf",            "stars": 2},
    UNIT_TYPE["CRIMSON_WITCH"]:         {"name": "Crimson Witch",         "stars": 1},
    UNIT_TYPE["DARK_DRACUL"]:           {"name": "Dark Dracul",           "stars": 1},
    UNIT_TYPE["DRAGON_LADY"]:           {"name": "Dragon Lady",           "stars": 1},
    UNIT_TYPE["DUST_DEVIL"]:            {"name": "Dust Devil",            "stars": 2},
    UNIT_TYPE["ELECTROYETI"]:           {"name": "Electroyeti",           "stars": 1},
    UNIT_TYPE["FAITH_HEALER"]:          {"name": "Faith Healer",          "stars": 1},
    UNIT_TYPE["NINJA_DWARF"]:           {"name": "Ninja Dwarf",           "stars": 1},
    UNIT_TYPE["POLEMASTER"]:            {"name": "Polemaster",            "stars": 3},
    UNIT_TYPE["ROLLER_WARRIOR"]:        {"name": "Roller Warrior",        "stars": 3},
    UNIT_TYPE["SNAP_DRAGON"]:           {"name": "Snap Dragon",           "stars": 2},
    UNIT_TYPE["UNSTABLE_UNDERSTUDY"]:   {"name": "Unstable Understudy",   "stars": 1},
}

# ─── Starter Heroes ──────────────────────────────────────────────────────────
# Rarity 26 = WHITE (starting rarity for all new heroes)

def get_starter_heroes():
    """Return starter heroes for new players - only heroes with complete local assets."""
    return [
        {"hero_type": UNIT_TYPE["CRIMSON_WITCH"],        "level": 1, "stars": 1, "rarity": 1},  # WHITE
        {"hero_type": UNIT_TYPE["ELECTROYETI"],          "level": 1, "stars": 1, "rarity": 1},  # WHITE
        {"hero_type": UNIT_TYPE["FAITH_HEALER"],         "level": 1, "stars": 1, "rarity": 1},  # WHITE
        {"hero_type": UNIT_TYPE["CENTAUR_OF_ATTENTION"], "level": 1, "stars": 1, "rarity": 1},  # WHITE
        {"hero_type": UNIT_TYPE["DARK_DRACUL"],          "level": 1, "stars": 1, "rarity": 1},  # WHITE
    ]


def get_hero_stats(hero_type, level=1):
    """Get hero info for a given hero_type ordinal."""
    hero = HEROES.get(hero_type)
    if not hero:
        return None
    return {"hero_type": hero_type, "name": hero["name"], "stars": hero["stars"], "level": level}


# ─── XP Tables ──────────────────────────────────────────────────────────────
# Team XP table — cumulative XP needed for each team level
# Tuned so team levels up every 1-2 campaign wins at appropriate chapter
# Level 2 = 50 (reachable in 1 campaign win), scaling up gradually
TEAM_XP_TABLE = {}
for _lvl in range(1, 131):
    if _lvl == 1:
        TEAM_XP_TABLE[_lvl] = 0
    else:
        # Level 2 = 50, Level 3 = 130, Level 4 = 240, etc.
        TEAM_XP_TABLE[_lvl] = TEAM_XP_TABLE[_lvl - 1] + int(20 * _lvl + 10 * (_lvl ** 0.8))

# Hero XP table — XP needed to reach each level
# Matches client's heroexpstats.tab display values
# Client shows 25 for level 2, scaling up from there
HERO_XP_TABLE = {}
for _lvl in range(1, 131):
    if _lvl == 1:
        HERO_XP_TABLE[_lvl] = 0
    else:
        # Level 2 = 25, Level 3 = 55, Level 4 = 90, etc.
        HERO_XP_TABLE[_lvl] = int(25 * (_lvl - 1) + 5 * ((_lvl - 1) ** 1.5))

# Campaign level generation (used for server-side simulation)
NPC_TYPES = {
    76: {"name": "Goblin"},
    101: {"name": "Wildling Archer"},
    65: {"name": "Crystal Golem"},
    80: {"name": "Ice Golem"},
    69: {"name": "Fire Imp"},
    97: {"name": "Stone Imp"},
    81: {"name": "Inferno Spider"},
}

def get_campaign_level(chapter, level):
    """Placeholder - campaign levels come from normalCampaign.tab on client side."""
    return None


# ─── Items (placeholder - real items come from .tab files on client) ──────────
ITEMS = {}

# ─── Stamina Costs ────────────────────────────────────────────────────────────
STAMINA_COSTS = {ch: 6 + (ch - 1) * 2 for ch in range(1, 16)}


# ─── Items (placeholder - real items come from .tab files on client) ──────────
ITEMS = {}

# ─── Stamina Costs ────────────────────────────────────────────────────────────
STAMINA_COSTS = {ch: 6 + (ch - 1) * 2 for ch in range(1, 16)}
