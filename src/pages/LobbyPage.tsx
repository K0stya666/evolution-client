import React, { useState } from "react";
import { createGame } from "../services/api";
import { useNavigate } from "react-router-dom";

const LobbyPage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleCreateGame = async () => {
        try {
            const newGame = await createGame();
            // Переходим в страницу игры
            navigate(`/game/${newGame.gameId}`);
        } catch {
            setError("Не удалось создать игру");
        }
    };

    // В реальном приложении здесь может быть список существующих игр,
    // кнопки "Присоединиться", логика ожидания 3–5 игроков и т.д.

    return (
        <div className="lobby-page">
            <h2>Лобби</h2>
            <button onClick={handleCreateGame}>Создать новую игру</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LobbyPage;
