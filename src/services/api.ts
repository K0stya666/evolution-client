// api.ts

import axios from 'axios';
import { User } from '../types/user';
// import SockJS from "sockjs-client";
// import {Stomp} from "@stomp/stompjs"

const API_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// export const connectWebSocket = (userId: string) => {
//     const socket = new SockJS('http://localhost:8080/app/ws');
//     stompClient = over(socket);
//
//     stompClient.connect({}, () => {
//         console.log('WebSocket Connected for user:', userId);
//
//         // Подписка на персональные события пользователя
//         stompClient?.subscribe(`/topic/user/${userId}`, (message) => {
//             const data = JSON.parse(message.body);
//             console.log('Received WebSocket Message:', data);
//         });
//     }, (error) => {
//         console.error('WebSocket Error:', error);
//     });
// };

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
};