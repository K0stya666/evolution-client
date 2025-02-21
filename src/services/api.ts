// api.ts

import axios from 'axios';
import { User } from '../types/user';
import { Game } from '../types/game';
// import SockJS from "sockjs-client";
// import {Stomp} from "@stomp/stompjs"

const API_URL = 'http://localhost:8080/app';

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
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Registration failed');
        }
    },

    fetchGames: async (): Promise<Game[]> => {
        try {
            const response = await api.get('/games/availableGames');
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to fetch games');
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
    },

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
    }
};