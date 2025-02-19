export type Phase =
    | "growth"             // фаза развития
    | "foodCalculation"    // фаза определения кормовой базы
    | "feeding"            // фаза питания
    | "extinction";        // фаза вымирания

export interface Card {
    id: string;
    title: string;
    description: string;
    // Признак, что карта может давать дополнительную потребность в еде, например
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