import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Game } from '../types/entities';
import GameWebSocket from '../services/GameWebSocket';

const LobbyPage: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [maxPlayers, setMaxPlayers] = useState<number>(2);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    // 1) On mount, subscribe to game-list updates from the WebSocket
    useEffect(() => {
        GameWebSocket.onFetchGames((fetchedGames) => {
            setGames(fetchedGames);
        });

        // 2) Immediately request the latest games
        GameWebSocket.fetchGames();

        // (Optional) Poll every X seconds, if you want:
        const intervalId = setInterval(() => {
            GameWebSocket.fetchGames();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    // Create game
    const handleCreateGame = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            GameWebSocket.createGame(maxPlayers);
            // The server broadcasts on /topic/games → your subscription can update the list
        } catch (err: any) {
            setError(err.message || 'Ошибка создания игры');
        }
    };

    // Join game
    const handleJoinGame = (gameId: number) => {
        try {
            GameWebSocket.joinGame(gameId);
            // Also triggers broadcast on /topic/games
            navigate(`/game/${gameId}`);
        } catch (err: any) {
            setError(err.message || 'Ошибка присоединения к игре');
        }
    };

    // Row click: Join & navigate
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
                <select
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(Number(e.target.value))}
                >
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
        </div>
    );
};

export default LobbyPage;
