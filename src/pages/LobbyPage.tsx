import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Game {
    id: number;
    stage: string;
    diceNumber: number; // максимальное количество игроков
}

const LobbyPage: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [maxPlayers, setMaxPlayers] = useState(2);
    const [error, setError] = useState('');

    // Функция получения списка игр (без токена)
    const fetchGames = async () => {
        try {
            const response = await axios.get('http://localhost:8080/games');
            setGames(response.data);
        } catch (err: any) {
            setError('Ошибка загрузки игр');
        }
    };

    useEffect(() => {
        fetchGames();
        // Обновляем список каждые 5 секунд (в дальнейшем можно перейти на WebSocket)
        const interval = setInterval(fetchGames, 5000);
        return () => clearInterval(interval);
    }, []);

    // Создание игры (требуется авторизация)
    const handleCreateGame = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:8080/games?maxPlayers=${maxPlayers}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchGames();
        } catch (err: any) {
            setError('Ошибка создания игры');
        }
    };

    // Присоединение к игре (требуется авторизация)
    const handleJoinGame = async (gameId: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:8080/games/${gameId}/join`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchGames();
        } catch (err: any) {
            setError('Ошибка присоединения к игре');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-4">Лобби</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-6">
                <form onSubmit={handleCreateGame}>
                    <label className="mr-2">Выберите количество игроков (2-4):</label>
                    <select
                        value={maxPlayers}
                        onChange={(e) => setMaxPlayers(Number(e.target.value))}
                        className="border rounded p-1 mr-2"
                    >
                        {[2, 3, 4].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                        Создать игру
                    </button>
                </form>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2">Доступные игры</h3>
                <ul>
                    {games.map((game) => (
                        <li key={game.id} className="mb-2 border p-2 rounded flex justify-between items-center">
                            <div>
                                <p>Игра #{game.id}</p>
                                <p>Максимум игроков: {game.diceNumber}</p>
                                <p>Статус: {game.stage}</p>
                            </div>
                            {game.stage === 'WAITING' && (
                                <button
                                    onClick={() => handleJoinGame(game.id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Присоединиться
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LobbyPage;
