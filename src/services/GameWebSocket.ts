import { Client, IMessage } from "@stomp/stompjs";

class GameWebSocket {
    private client: Client;

    constructor() {
        this.client = new Client({
            brokerURL: "ws://localhost:8080/ws", // URL точки подключения WebSocket
            reconnectDelay: 5000, // Автоматическое переподключение через 5 секунд
            onConnect: () => {
                console.log("WebSocket подключен!");
                this.subscribeToGameUpdates();
            },
            onStompError: (error) => {
                console.error("Ошибка STOMP:", error);
            },
        });

        this.client.activate();
    }

    // Подписываемся на общий канал обновлений игр
    private subscribeToGameUpdates() {
        this.client.subscribe("/topic/games", (message: IMessage) => {
            console.log("Обновление игры:", message.body);
            // Здесь можно обновлять состояние приложения в зависимости от полученных данных
        });

        // Если нужно получать личные сообщения (например, список игроков)
        this.client.subscribe("/user/queue/players", (message: IMessage) => {
            console.log("Список игроков:", message.body);
            // Например, обновляем состояние компонента
        });
    }

    public login(login: string, password: string) {
        this.client.publish({
            destination: "/app/auth/login",
            body: JSON.stringify({ login, password })
        });
    }

    public register(login: string, password: string) {
        this.client.publish({
            destination: "/app/auth/register",
            body: JSON.stringify({ login, password })
        });
    }

    // Отправка запроса на создание игры
    public createGame(maxPlayers: number) {
        this.client.publish({
            destination: "/app/games/createGame",
            body: JSON.stringify(maxPlayers)
        });
    }

    // Отправка запроса на присоединение к игре
    public joinGame(gameId: number) {
        this.client.publish({
            destination: "/app/games/joinGame",
            body: JSON.stringify(gameId)
        });
    }

    // Отправка запроса на получение списка игроков
    public getPlayers(gameId: number) {
        this.client.publish({
            destination: "/app/games/getPlayers",
            body: JSON.stringify(gameId)
        });
    }

    // Метод для отключения
    public disconnect() {
        this.client.deactivate();
    }
}

export default new GameWebSocket();