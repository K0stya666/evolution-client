import React from 'react';
import Menu from "../components/Menu.tsx";
import Dice from "../components/dice/Dice.tsx";

/**
 * ВАЖНО:
 * 1) Все картинки (карты, жетоны, кубик, ящерицу и т.д.) в данном примере заменены на условные src="..."
 *    Замените на реальные пути к вашим ресурсам (или импортируйте их через import cardImg from '...'.
 * 2) Tailwind-классы можно скорректировать под ваш дизайн (цвета, отступы, размеры).
 * 3) Если хотите управлять данными (круг, фаза, время, список игроков и т.д.) динамически,
 *    пробросьте их в этот компонент через props или через глобальное состояние (Redux, Zustand и т.д.).
 */

const GamePage: React.FC = () => {






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
