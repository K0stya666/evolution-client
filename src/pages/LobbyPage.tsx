import React, { useEffect, useState } from 'react';
import { Game } from '../types/game';
import { authApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

const LobbyPage: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [maxPlayers, setMaxPlayers] = useState<number>(2);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    // Получение списка свободных игр
    const fetchGames = async () => {
        try {
            const gamesList = await authApi.fetchGames();
            setGames(gamesList);
        } catch (err: any) {
            setError(err.message || 'Ошибка загрузки игр');
        }
    };
    useEffect(() => {
        fetchGames();
        const interval = setInterval(fetchGames, 5000);
        return () => clearInterval(interval);
    }, []);

    // Создание игры
    const handleCreateGame = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authApi.createGame(maxPlayers);
            fetchGames();
        } catch (err: any) {
            setError(err.message || 'Ошибка создания игры');
        }
    };

    // Присоединение к игре
    const handleJoinGame = async (gameId: number) => {
        try {
            await authApi.joinGame(gameId);
            navigate(`/game/${gameId}`);
        } catch (err: any) {
            setError(err.message || 'Ошибка присоединения к игре');
        }
    };

    // Переход в игру при клике по строке таблицы
    const handleRowClick = (game: Game) => {
        navigate(`/game/${game.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-4">Лобби</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-6">
                <form onSubmit={handleCreateGame} className="flex items-center">
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
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Игры</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Максимум игроков</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                        <th className="px-6 py-3"></th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {games.map((game) => (
                        <tr
                            key={game.id}
                            className="hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleRowClick(game)}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">{game.id}</td>
                            {/*<td className="px-6 py-4 whitespace-nowrap">{game.diceNumber}</td>*/}
                            {/*<td className="px-6 py-4 whitespace-nowrap">{game.stage}</td>*/}
                            <td className="px-6 py-4 whitespace-nowrap">{game.stage}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {game.stage === 'WAITING' && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // чтобы не сработал клик по строке
                                            handleJoinGame(game.id);
                                        }}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Присоединиться
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LobbyPage;
