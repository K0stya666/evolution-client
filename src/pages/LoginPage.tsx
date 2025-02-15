// src/pages/LoginPage.tsx

import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "../services/socket";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await loginUser(username, password);
            if (user.token) {
                // Подключаем сокет с токеном
                connectSocket(user.token);
            }
            // После логина переходим в лобби
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Ошибка входа");
        }
    };

    return (
        <div className="login-page">
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
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
                {error && <p className="error">{error}</p>}
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginPage;
