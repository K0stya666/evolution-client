import axios from 'axios';
import {Card, Player, User} from "../types/entities.ts";
import {Deck} from "../types/models.ts";


const API_URL = 'http://localhost:8080/app';

export interface Game {
    id: number;
    stage: string;
    diceNumber: number;
}

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерцептор для проверки истечения токена
api.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response?.status === 401) { // Если токен истёк
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await api.post('/auth/refresh', { refreshToken });

                localStorage.setItem('token', response.data.token);
                error.config.headers['Authorization'] = `Bearer ${response.data.token}`;

                return api(error.config);
            } catch (refreshError) {
                console.error('Ошибка обновления токена:', refreshError);
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    login: async (login: string, password: string): Promise<User> => {
        try {
            const response = await api.post('/auth/login', { login, password });
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Login failed');
        }
    },

    register: async (login: string, password: string): Promise<User> => {
        try {
            const response = await api.post('/auth/register', { login, password });
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('Registration failed');
        }
    },

    fetchGames: async (): Promise<Game[]> => {
        try {
            const response = await api.get('/games/availableGames');
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Failed to fetch games');
            }
        }
    },

    createGame: async (maxPlayers: number): Promise<Game> => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.post(
                `/games/createGame?maxPlayers=${maxPlayers}`,
                { maxPlayers },
                {
                    headers:
                        {
                            Authorization: `Bearer ${token}`
                        }
                }
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to create game');
        }
    }
};

export const gameApi = {
    joinGame: async (gameId: number): Promise<Game> => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.post(
                `/games/${gameId}/join`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to join game');
        }
    },

    getPlayers: async (gameId: number): Promise<Player[]> => {
        try {
            const response = await api.get(`/games/${gameId}/getPlayers`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to get players');
        }
    },

    getDeck: async (): Promise<Deck> => {
        try {
            const response = await api.get('/games/getDeck');
            return response.data;
        } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error('Failed to get deck');
            }
        }
    },

    getCard: async (gameId: number): Promise<Card> => {
        try {
            const response = await api.get(`/games/${gameId}/getCard`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to get cards');
        }
    }
}