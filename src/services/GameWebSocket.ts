import { Client, IMessage } from "@stomp/stompjs";

class GameWebSocket {
    private client: Client;

    constructor() {
        this.client = new Client({
            brokerURL: "ws://localhost:8080/ws", // URL точки подключения WebSocket
            reconnectDelay: 5000, // Автоматическое переподключение через 5 секунд
            onConnect: () => {
                console.log("WebSocket подключен!");
                this.subscribeToAuthResponses();
                this.subscribeToGameUpdates();
            },
            onStompError: (error) => {
                console.error("Ошибка STOMP:", error);
            },
        });

        this.client.activate();
    }

    private subscribeToAuthResponses() {
        this.client.subscribe("/user/queue/auth", (message: IMessage) => {
            const authResponse = JSON.parse(message.body);
            console.log("Auth response:", authResponse);

            // If the response has a token, store it
            if (authResponse.token) {
                localStorage.setItem("token", authResponse.token);

                // Optionally reconnect with token, if your server requires
                // a token in the CONNECT headers for future requests
                this.reconnectWithToken(authResponse.token);
            }
        });
    }

    private reconnectWithToken(token: string) {
        console.log("Disconnecting current client to reconnect with token...");

        // Deactivate current connection
        this.client.deactivate().then(() => {
            // Create a brand-new STOMP Client with the token in connectHeaders
            const newClient = new Client({
                brokerURL: "ws://localhost:8080/ws",
                connectHeaders: {
                    Authorization: `Bearer ${token}`,
                },
                reconnectDelay: 5000,
                onConnect: () => {
                    console.log("Reconnected with token!");
                    // Re-subscribe to the topics you need, e.g.:
                    newClient.subscribe("/topic/games", (msg) => { /* ... */ });
                    newClient.subscribe("/user/queue/players", (msg) => { /* ... */ });
                    newClient.subscribe("/user/queue/auth", (msg) => { /* ... */ });
                },
                onStompError: (error) => {
                    console.error("STOMP Error:", error);
                },
            });

            // Finally, activate the new client
            newClient.activate();

            // If you want to store the newClient in a class property, do so:
            this.client = newClient;
        });
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