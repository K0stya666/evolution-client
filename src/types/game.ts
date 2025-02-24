export enum CardCondition {
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

export enum CardPerks {
    CARNIVOROUS = "ХИЩНИК",
    FAT_TISSUE = "ЖИРОВОЙ ЗАПАС",
}

export const CardPerksImages: Record<CardPerks, string> = {
    [CardPerks.CARNIVOROUS]: "/images/carnivorous.png",
    [CardPerks.FAT_TISSUE]: "/images/fat.png"
}

export const deck = [
    { condition: CardCondition.SWIMMING},
    { condition: CardCondition.COMMUNISM, perk: CardPerks.FAT_TISSUE },
    { condition: CardCondition.SCAVENGER, perk: CardPerks.CARNIVOROUS },

    { condition: CardCondition.SWIMMING},
    { condition: CardCondition.COMMUNISM, perk: CardPerks.FAT_TISSUE },
    { condition: CardCondition.SCAVENGER, perk: CardPerks.CARNIVOROUS },
    { condition: CardCondition.SWIMMING},
    { condition: CardCondition.COMMUNISM, perk: CardPerks.FAT_TISSUE },
    { condition: CardCondition.SCAVENGER, perk: CardPerks.CARNIVOROUS },
    { condition: CardCondition.SWIMMING},
    { condition: CardCondition.COMMUNISM, perk: CardPerks.FAT_TISSUE },
    { condition: CardCondition.SCAVENGER, perk: CardPerks.CARNIVOROUS },
    { condition: CardCondition.SWIMMING},
    { condition: CardCondition.COMMUNISM, perk: CardPerks.FAT_TISSUE },
    { condition: CardCondition.SCAVENGER, perk: CardPerks.CARNIVOROUS },
    { condition: CardCondition.SWIMMING},
    { condition: CardCondition.COMMUNISM, perk: CardPerks.FAT_TISSUE },
    { condition: CardCondition.SCAVENGER, perk: CardPerks.CARNIVOROUS },
    { condition: CardCondition.SWIMMING},
    { condition: CardCondition.COMMUNISM, perk: CardPerks.FAT_TISSUE },
    { condition: CardCondition.SCAVENGER, perk: CardPerks.CARNIVOROUS },
    { condition: CardCondition.SWIMMING},
    { condition: CardCondition.COMMUNISM, perk: CardPerks.FAT_TISSUE },
    { condition: CardCondition.SCAVENGER, perk: CardPerks.CARNIVOROUS },
    { condition: CardCondition.SWIMMING},
    { condition: CardCondition.COMMUNISM, perk: CardPerks.FAT_TISSUE },
    { condition: CardCondition.SCAVENGER, perk: CardPerks.CARNIVOROUS }
];






export type Phase =
    | "growth"             // фаза развития
    | "foodCalculation"    // фаза определения кормовой базы
    | "feeding"            // фаза питания
    | "extinction";        // фаза вымирания

export interface Card {
    id: string;
    title: string;
    description: string;
    extraFoodNeeded?: number;
}

export interface Player {
    id: string;
    username: string;
    hand: Card[];
    animals: Animal[];
}

export interface Animal {
    id: string;
    cards: Card[];  // свойства (карты), наложенные на животное
    foodNeeded: number; // сколько фишек нужно, чтобы накормить
    foodEaten: number;  // сколько фишек уже получено
}

export interface GameState {
    gameId: string;
    players: Player[];
    currentPlayerId: string;
    phase: Phase;
    foodBase: number;    // текущее количество фишек в кормовой базе
    round: number;
}

export interface Game {
    id: number;
    stage: string;
    diceNumber: number;
}