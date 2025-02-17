import axios from 'axios';
import { User } from '../types/user';
import { GameState } from '../types/game';

const API_URL = 'http://localhost:8080/app';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authApi = {
    register: async (login: string, password: string): Promise<User> => {
        const response = await api.post('/register', { login, password });
        return response.data;
    },

    login: async (login: string, password: string): Promise<User> => {
        const response = await api.post('/login', { login, password });
        return response.data;
    },
};

export const gameApi = {
    createGame: async (): Promise<GameState> => {
        const response = await api.post('/api/games');
        return response.data;
    },

    getGame: async (id: string): Promise<GameState> => {
        const response = await api.get(`/api/games/${id}`);
        return response.data;
    },

    updateGameStage: async (id: string, stage: string): Promise<GameState> => {
        const response = await api.put(`/api/games/${id}/stage`, { stage });
        return response.data;
    },
};