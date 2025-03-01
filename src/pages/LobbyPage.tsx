import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Game } from '../types/entities';
import useGameWebSocket from '../services/useGameWebSocket';

const LobbyPage: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [maxPlayers, setMaxPlayers] = useState<number>(2);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    // Получаем методы и состояние из кастомного хука
    const { fetchGames, createGame, joinGame, addFetchGamesCallback, readyState } = useGameWebSocket();

    // Подписываемся на обновления списка игр при монтировании компонента
    useEffect(() => {
        addFetchGamesCallback((fetchedGames: Game[]) => {
            setGames(fetchedGames);
        });

        // Запрашиваем актуальный список игр
        fetchGames();

        // Опционально: обновляем список каждые 5 секунд
        const intervalId = setInterval(() => {
            fetchGames();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [addFetchGamesCallback, fetchGames]);

    // Создание игры
    const handleCreateGame = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            createGame(maxPlayers);
        } catch (err: any) {
            setError(err.message || 'Ошибка создания игры');
        }
    };

    // Присоединение к игре
    const handleJoinGame = (gameId: number) => {
        try {
            joinGame(gameId);
            navigate(`/game/${gameId}`);
        } catch (err: any) {
            setError(err.message || 'Ошибка присоединения к игре');
        }
    };

    // По клику по строке таблицы присоединяемся к игре
    const handleRowClick = (game: Game) => {
        localStorage.setItem("gameId", game.id.toString());
        handleJoinGame(game.id);
    };

    return (
        <div>
            <h2>Лобби</h2>
            {error && <p>{error}</p>}

            <form onSubmit={handleCreateGame}>
                <label>Кол-во игроков (2-4):</label>
                <select value={maxPlayers} onChange={(e) => setMaxPlayers(Number(e.target.value))}>
                    {[2, 3, 4].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                <button type="submit">Создать игру</button>
            </form>

            <h3>Доступные игры</h3>
            <table>
                <thead>
                <tr>
                    <th>ID Игры</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {games.map(game => (
                    <tr key={game.id} onClick={() => handleRowClick(game)}>
                        <td>{game.id}</td>
                        <td>{game.stage}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <p>Статус соединения: {readyState}</p>
        </div>
    );
};

export default LobbyPage;
