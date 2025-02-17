import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { GameState } from '../types/game';

let stompClient: Client | null = null;

export const connectWebSocket = (onConnect: () => void, onError: (error: any) => void) => {
    const socket = new SockJS('http://localhost:8080/app/ws');
    stompClient = over(socket);

    stompClient.connect(
        {},
        () => {
            console.log('WebSocket Connected');
            onConnect();
        },
        (error) => {
            console.error('WebSocket Error:', error);
            onError(error);
        }
    );

    return () => {
        if (stompClient?.connected) {
            stompClient.disconnect();
        }
    };
};

export const subscribeToGame = (gameId: string, onGameUpdate: (state: GameState) => void) => {
    if (!stompClient?.connected) {
        throw new Error('WebSocket not connected');
    }

    return stompClient.subscribe(`/topic/game/${gameId}`, (message) => {
        const gameState = JSON.parse(message.body);
        onGameUpdate(gameState);
    });
};

export const sendGameAction = (action: any) => {
    if (!stompClient?.connected) {
        throw new Error('WebSocket not connected');
    }

    stompClient.send('/app/game/action', {}, JSON.stringify(action));
};