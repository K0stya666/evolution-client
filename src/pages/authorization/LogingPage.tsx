import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameWebSocket from "../../services/GameWebSocket.ts";

const LoginForm: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            localStorage.setItem('login', login);
            GameWebSocket.login(login, password);
            navigate('/lobby');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Login failed');
            }
        }
    };

    return (
        <div>
            <div>
                <h2>Вход</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Логин</label>
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
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
                    {error && <p>{error}</p>}
                    <button type="submit">Войти</button>
                    <button onClick={() => navigate('/register')}>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;