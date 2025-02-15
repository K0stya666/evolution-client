import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameState } from "../services/api";
import { onGameStateUpdate, sendPlayerAction } from "../services/socket";
import { GameState } from "../types/game";
import PlayerArea from "../components/PlayerArea.tsx";
import FoodTokens from "../components/FoodTokens.tsx";
import Card from "../components/Card.tsx";

const GamePage: React.FC = () => {
    const { gameId } = useParams();
    const [gameState, setGameState] = useState<GameState | null>(null);

    useEffect(() => {
        if (!gameId) return;

        // Изначально получаем состояние игры с сервера
        getGameState(gameId)
            .then((state) => setGameState(state))
            .catch((err) => console.error(err));

        // Подписываемся на обновления
        onGameStateUpdate((updatedState: GameState) => {
            if (updatedState.gameId === gameId) {
                setGameState(updatedState);
            }
        });

        // При размонтировании компонента можно отписаться
        // (хотя в Socket.IO можно не всегда явно отписываться)
    }, [gameId]);

    // Пример функции для совершения действия
    const handlePlayCard = (cardId: string) => {
        if (!gameState) return;
        // Отправляем действие на сервер
        sendPlayerAction({
            type: "PLAY_CARD",
            cardId,
            gameId: gameState.gameId,
        });
    };

    // Здесь можно реализовать логику рендера на основе gameState.phase
    // например, показывать разные UI-элементы

    if (!gameState) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="game-page">
            <h2>Игра: {gameState.gameId}</h2>
            <p>Текущая фаза: {gameState.phase}</p>
            <p>Раунд: {gameState.round}</p>
            <p>Кормовая база: {gameState.foodBase}</p>

            {/* Пример: отображаем всех игроков */}
            <div className="players">
                {gameState.players.map((player) => (
                    <PlayerArea key={player.id} player={player} />
                ))}
            </div>

            {/* Пример: компонент с фишками еды */}
            <FoodTokens count={gameState.foodBase} />

            {/* Пример: отображение карт текущего игрока (упрощённо) */}
            <div className="player-hand">
                <h3>Ваши карты</h3>
                {gameState.players
                    .find((p) => p.id === gameState.currentPlayerId)
                    ?.hand.map((card) => (
                        <Card key={card.id} card={card} onPlayCard={handlePlayCard} />
                    ))}
            </div>
        </div>
    );
};

export default GamePage;
