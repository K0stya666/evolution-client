import { io, Socket } from "socket.io-client";
import { GameState } from "../types/game";

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
    socket = io("http://localhost:3000", {
        auth: {
            token,
        },
    });

    socket.on("connect", () => {
        console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });
};

// Подписка на обновления состояния игры
export const onGameStateUpdate = (callback: (state: GameState) => void) => {
    socket?.on("gameStateUpdate", callback);
};

// Отправка события на сервер (пример)
export const sendPlayerAction = (action: any) => {
    socket?.emit("playerAction", action);
};

// Закрыть соединение
export const disconnectSocket = () => {
    socket?.disconnect();
};
