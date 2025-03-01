import { useCallback, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Game } from '../types/entities';

const token = localStorage.getItem("token") || "";
const SOCKET_URL = `ws://localhost:8080/ws?token=${encodeURIComponent(token)}`;

interface WebSocketMessage {
    destination: string;
    body?: any;
}

const useGameWebSocket = () => {
    const [fetchGamesCallbacks, setFetchGamesCallbacks] = useState<((games: Game[]) => void)[]>([]);

    const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(SOCKET_URL, {
        onOpen: () => {
            console.log("WebSocket подключен!");
        },
        onMessage: (message) => {
            if (!message.data) return;
            try {
                const parsed: WebSocketMessage = JSON.parse(message.data);
                const { destination, body } = parsed;
                switch (destination) {
                    case "/user/queue/auth":
                        console.log("Auth response:", body);
                        if (body && body.token) {
                            localStorage.setItem("token", body.token);
                            // Здесь можно добавить логику переподключения с новым токеном, если требуется.
                        }
                        break;
                    case "/user/queue/fetchGamesResponse":
                        console.log("Получен список игр:", body);
                        fetchGamesCallbacks.forEach((cb) => cb(body));
                        break;
                    case "/topic/games":
                        console.log("Обновление игры:", body);
                        break;
                    case "/user/queue/players":
                        console.log("Список игроков:", body);
                        break;
                    default:
                        console.log("Неизвестное сообщение:", parsed);
                }
            } catch (error) {
                console.error("Ошибка при обработке сообщения:", error);
            }
        },
        shouldReconnect: () => true,
        reconnectAttempts: Infinity,
        reconnectInterval: 5000,
    });

    const addFetchGamesCallback = useCallback((cb: (games: Game[]) => void) => {
        setFetchGamesCallbacks((prev) => [...prev, cb]);
    }, []);

    const login = useCallback((login: string, password: string) => {
        const msg = JSON.stringify({
            destination: "/app/auth/login",
            body: { login, password },
        });
        sendMessage(msg);
    }, [sendMessage]);

    const register = useCallback((login: string, password: string) => {
        const msg = JSON.stringify({
            destination: "/app/auth/register",
            body: { login, password },
        });
        sendMessage(msg);
    }, [sendMessage]);

    const fetchGames = useCallback(() => {
        const msg = JSON.stringify({
            destination: "/app/games/fetchGames",
        });
        sendMessage(msg);
    }, [sendMessage]);

    const createGame = useCallback((maxPlayers: number) => {
        const msg = JSON.stringify({
            destination: "/app/games/createGame",
            body: maxPlayers,
        });
        sendMessage(msg);
    }, [sendMessage]);

    const joinGame = useCallback((gameId: number) => {
        const msg = JSON.stringify({
            destination: "/app/games/joinGame",
            body: gameId,
        });
        sendMessage(msg);
    }, [sendMessage]);

    const getPlayers = useCallback((gameId: number) => {
        const msg = JSON.stringify({
            destination: "/app/games/getPlayers",
            body: gameId,
        });
        sendMessage(msg);
    }, [sendMessage]);

    const disconnect = useCallback(() => {
        const socket = getWebSocket();
        if (socket) {
            socket.close();
            console.log("WebSocket отключён");
        }
    }, [getWebSocket]);

    return {
        login,
        register,
        fetchGames,
        createGame,
        joinGame,
        getPlayers,
        disconnect,
        addFetchGamesCallback,
        lastMessage,
        readyState,
    };
};

export default useGameWebSocket;
