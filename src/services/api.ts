import axios from "axios";
import { User } from "../types/user";
import { GameState } from "../types/game";

// Базовый инстанс axios
const apiClient = axios.create({
    baseURL: "http://localhost:5137/api", // или ваш URL
    withCredentials: true, // если нужно передавать куки
});

// Пример функций для взаимодействия с сервером

// Регистрация
export async function registerUser(username: string, password: string): Promise<User> {
    const response = await apiClient.post("/auth/register", { username, password });
    return response.data;
}

// Логин
export async function loginUser(username: string, password: string): Promise<User> {
    const response = await apiClient.post("/auth/login", { username, password });
    return response.data;
}

// Получить текущее состояние игры
export async function getGameState(gameId: string): Promise<GameState> {
    const response = await apiClient.get(`/game/${gameId}`);
    return response.data;
}

// Создать новую игру
export async function createGame(): Promise<GameState> {
    const response = await apiClient.post("/game");
    return response.data;
}

// Прочие методы: ход игрока, добавление карт, фаза питания и т.д.
