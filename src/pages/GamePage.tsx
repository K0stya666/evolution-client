import React, { useEffect, useState } from 'react';
import Menu from "../components/Menu.tsx";
import Dice from "../components/dice/Dice.tsx";
import { Player } from "../types/entities.ts";
import { gameApi } from "../services/api.ts";

const GamePage: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const gameId = Number(localStorage.getItem('gameId'));

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await gameApi.getPlayers(gameId);
                setPlayers(data);
            } catch (error) {
                console.error("Ошибка при получении игроков:", error);
            }
        };

        fetchPlayers();
    }, [gameId]);

    // Настройки для круга
    const radius = 600; // Радиус круга
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    return (
        <div>
            <Menu />
            <main>
                <div>
                    <div className="dice-container">
                        <Dice />
                    </div>

                    <div className="players-container">
                        {players.map((player, index) => {
                            console.log(player.name);
                            // Вычисляем угол для каждого игрока
                            const angle = (index / players.length) * 2 * Math.PI;
                            // Вычисляем позицию игрока по оси X и Y с учетом смещения на половину ширины/высоты элемента
                            const x = centerX + radius * Math.cos(angle) - 25;
                            const y = centerY + radius * Math.sin(angle) - 25;

                            return (
                                <div>
                                    <div>
                                        {}
                                        <p>hui</p>
                                    </div>

                                    <div
                                        key={player.id}
                                        style={{
                                            position: "absolute",
                                            left: `${x}px`,
                                            top: `${y}px`,
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                            // backgroundColor: "lightblue",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            // border: "1px solid red"
                                        }}
                                    >
                                        {player.name}
                                    </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GamePage;
