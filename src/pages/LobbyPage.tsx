import React, { useEffect, useState } from 'react';
import {authApi, gameApi} from '../services/api';
import { useNavigate } from 'react-router-dom';
import {Game} from "../types/entities.ts";

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
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ошибка загрузки игр');
            }
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
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ошибка создания игры');
            }
        }
    };

    // Присоединение к игре
    const handleJoinGame = async (gameId: number) => {
        try {
            await gameApi.joinGame(gameId);
            navigate(`/game/${gameId}`);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ошибка присоединения к игре');
            }
        }
    };

    // Переход в игру при клике по строке таблицы
    const handleRowClick = (game: Game) => {
        localStorage.setItem("gameId", game.id.toString());
        handleJoinGame(game.id);
        navigate(`/game/${game.id}`);
    };

    return (
        <div>
            <h2>Лобби</h2>
            {error && <p>{error}</p>}
            <div>
                <form onSubmit={handleCreateGame}>
                    <label>Выберите количество игроков (2-4):</label>
                    <select
                        value={maxPlayers}
                        onChange={(e) => setMaxPlayers(Number(e.target.value))}
                    >
                        {[2, 3, 4].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <button type="submit">
                        Создать игру
                    </button>
                </form>
            </div>
            <div>
                <h3>Доступные игры</h3>
                <table>
                    <thead>
                    <tr>
                        <th>ID Игры</th>
                        <th>Максимум игроков</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {games.map((game) => (
                        <tr
                            key={game.id}
                            onClick={() => handleRowClick(game)}
                        >
                            <td>{game.id}</td>
                            <td >{game.stage}</td>
                            <td>
                                {/*{game.stage === 'WAITING' && (*/}
                                {/*    <button*/}
                                {/*        onClick={(e) => {*/}
                                {/*            e.stopPropagation(); // чтобы не сработал клик по строке*/}
                                {/*            handleJoinGame(game.id);*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        Присоединиться*/}
                                {/*    </button>*/}
                                {/*)}*/}
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
