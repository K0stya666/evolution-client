export enum Perk {
    SWIMMING = "ВОДОПЛАВАЮЩЕЕ",
    RUNNING = "БЫСТРОЕ",
    MIMICRY = "МИМИКРИЯ",
    SCAVENGER = "ПАДАЛЬЩИК",
    SYMBIOSES = "СИМБИОЗ",
    PIRACY = "ПИРАТСТВО",
    TAIL_LOSE = "ОТБРАСЫВАНИЕ ХВОСТА",
    COMMUNISM = "ВЗАИМОДЕЙСТВИЕ",
    GRAZING = "ТОПОТУН",
    HIGH_BODY_WEIGHT = "БОЛЬШОЙ",
    HIBERNATION_ABILITY = "СПЯЧКА",
    POISONOUS = "ЯДОВИТОЕ",
    COOPERATION = "СОТРУДНЕЧЕСТВО",
    BURROWING = "НОРНОЕ",
    CAMOUFLAGE = "КАМУФЛЯЖ",
    SHARP_VISION = "ОСТРОЕ ЗРЕНИЕ",
    PARASITE = "ПАРАЗИТ"
}

export enum Type {
    CARNIVOROUS = "ХИЩНИК",
    FAT_TISSUE = "ЖИРОВОЙ ЗАПАС",
}

export const CardTypesImages: Record<Type, string> = {
    [Type.CARNIVOROUS]: "/images/carnivorous.png",
    [Type.FAT_TISSUE]: "/images/fat.png"
}












export const deck = [
    { condition: Perk.SWIMMING},
    { condition: Perk.COMMUNISM, perk: Type.FAT_TISSUE },
    { condition: Perk.SCAVENGER, perk: Type.CARNIVOROUS },

    { condition: Perk.SWIMMING},
    { condition: Perk.COMMUNISM, perk: Type.FAT_TISSUE },
    { condition: Perk.SCAVENGER, perk: Type.CARNIVOROUS },
    { condition: Perk.SWIMMING},
    { condition: Perk.COMMUNISM, perk: Type.FAT_TISSUE },
    { condition: Perk.SCAVENGER, perk: Type.CARNIVOROUS },
    { condition: Perk.SWIMMING},
    { condition: Perk.COMMUNISM, perk: Type.FAT_TISSUE },
    { condition: Perk.SCAVENGER, perk: Type.CARNIVOROUS },
    { condition: Perk.SWIMMING},
    { condition: Perk.COMMUNISM, perk: Type.FAT_TISSUE },
    { condition: Perk.SCAVENGER, perk: Type.CARNIVOROUS },
    { condition: Perk.SWIMMING},
    { condition: Perk.COMMUNISM, perk: Type.FAT_TISSUE },
    { condition: Perk.SCAVENGER, perk: Type.CARNIVOROUS },
    { condition: Perk.SWIMMING},
    { condition: Perk.COMMUNISM, perk: Type.FAT_TISSUE },
    { condition: Perk.SCAVENGER, perk: Type.CARNIVOROUS },
    { condition: Perk.SWIMMING},
    { condition: Perk.COMMUNISM, perk: Type.FAT_TISSUE },
    { condition: Perk.SCAVENGER, perk: Type.CARNIVOROUS },
    { condition: Perk.SWIMMING},
    { condition: Perk.COMMUNISM, perk: Type.FAT_TISSUE },
    { condition: Perk.SCAVENGER, perk: Type.CARNIVOROUS }
];


