import {Perk, Type} from "./conditions.ts";


export interface User {
    id: string;
    login: string;
    token?: string;
}

export interface Game {
    id: number;
    stage: string;
    diceNumber: number;
}

export interface Player {
    id: number;
    game: Game;
    playerUser: User;
    name: string;
}

export interface Card {
    characteristic: Perk;
    type: Type;
}