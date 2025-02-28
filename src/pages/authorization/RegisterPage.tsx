// RegisterPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameWebSocket from "../../services/GameWebSocket.ts";

const RegisterPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            GameWebSocket.register(login, password);
            navigate('/');
        } catch (err) {
            if (err instanceof Error)
                setError(err.message );
            else
                setError('Registration failed');
        }
    };

    return (
        <div>
            <div>
                <h2>Регистрация</h2>
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
                    <button
                        type="submit"
                    >
                        Зарегистрироваться
                    </button>
                    <button onClick={() => navigate('/')}>Войти</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;