import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu.tsx";
import Dice from "../components/dice/Dice.tsx";
import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;

interface Player {
    id: number;
    login: string;
    // hand: Card[];
    // animals: Animal[];
}

const GamePage: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const fetchPlayers = async (gameId: number) => {
        try {
            axios.get(Player[])
            // const data = gameApi.getPlayers(gameId)
            // setPlayers(data)
        } catch (err: any) {
            setError(err.message || 'Ошибка загрузки игроков');
        }
    }

    // useEffect(() => {
    //     async function fetchPlayers() {
    //         try {
    //             const data = await gameApi.getPlayers(gameId);
    //             setPlayers(data);
    //         } catch (err: any) {
    //             setError(err.message || 'Ошибка загрузки игроков');
    //         }
    //     }
    //     fetchPlayers();
    // }, [gameId]);






    return (
        <div>
            <Menu />
            {/*{ deck }*/}

            {/* Основная область (игровое поле) */}
            <main>
                {/* Пример расположения красных фишек (еда) и кубика в верхней части */}
                <div>
                    <div>
                        {/* жетоноы еды */}
                    </div>
                    <div className="dice-container">
                        <Dice/>
                    </div>

                </div>


            </main>
        </div>
    );
};

export default GamePage;
