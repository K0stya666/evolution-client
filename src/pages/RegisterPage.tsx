import React, {useEffect, useState} from "react";
import {Client, Message, over} from "stompjs";
import SockJS from "sockjs-client";

interface RegisterResponse {
    status: string;
    error?: string;
}

const RegisterPage: React.FC = () => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responseMsg, setResponseMsg] = useState("");

    useEffect(() => {
        // Подключаемся к /ws на сервере
        const socket = new SockJS('http://localhost:8080/ws');
        const client = over(socket);

        // Устанавливаем соединение
        client.connect({}, () => {
            console.log('Connected to STOMP');

        }, (error) => {
            console.error('Ошибка подключения STOMP: ', error);
        });

        setStompClient(client);

        // Отключаемся при размонтировании компонента
        return () => {
            if (client.connected) {
                client.disconnect(() => {
                    console.log('Disconnected from STOMP');
                });
            }
        };
    }, []);

    // Отправка формы
    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        if (!stompClient || !stompClient.connected) {
            setResponseMsg('Нет подключения к серверу');
            return;
        }

        console.log(username, password);

        stompClient.send('/app/register', {}, JSON.stringify({
            username,
            password,
        }));
    };


    return (
        <div className="register-page" style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Имя пользователя</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {/*{error && <p className="error">{error}</p>}*/}
                <button type="submit">Зарегистрироваться</button>
            </form>
            {responseMsg && <p>{responseMsg}</p>}
        </div>
    );
};

export default RegisterPage;
