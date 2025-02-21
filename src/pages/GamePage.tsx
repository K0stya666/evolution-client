import React from 'react';

/**
 * ВАЖНО:
 * 1) Все картинки (карты, жетоны, кубик, ящерицу и т.д.) в данном примере заменены на условные src="..."
 *    Замените на реальные пути к вашим ресурсам (или импортируйте их через import cardImg from '...'.
 * 2) Tailwind-классы можно скорректировать под ваш дизайн (цвета, отступы, размеры).
 * 3) Если хотите управлять данными (круг, фаза, время, список игроков и т.д.) динамически,
 *    пробросьте их в этот компонент через props или через глобальное состояние (Redux, Zustand и т.д.).
 */

const GamePage: React.FC<{
    menu: React.ReactNode
    deck: React.ReactNode
}> = ({ menu, deck }) => {






    return (
        <div>
            { menu }
            { deck }
            {/* Верхняя панель */}
            <header className="header">
                <div className="header-left">
                    <span className="text-sm">Круг: 1</span>
                    <span className="text-sm">Фаза: развитие</span>
                </div>
                <div className="header-center">00:05:30</div>
                <div className="header-right">Профиль</div>
            </header>


            {/* Основная область (игровое поле) */}
            <main>
                {/* Пример расположения красных фишек (еда) и кубика в верхней части */}
                <div>
                    <div>
                        {/* Замените src на ваши иконки жетонов еды */}
                        <img src="/assets/red-token.png" alt="food token"/>
                        <img src="/assets/red-token.png" alt="food token"/>
                        <img src="/assets/red-token.png" alt="food token"/>
                    </div>
                    {/* Кубик */}
                    <img src="/assets/dice.png" alt="dice"/>
                </div>

                {/* Подпись по центру: "Игроки по очереди выкладывают 1 карту с руки" */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-base font-semibold">
                        Игроки по очереди выкладывают 1 карту с руки
                    </p>
                </div>

                {/* Игроки: пример расположения */}
                {/* Игрок слева (prosto_chel) */}
                <div className="absolute top-24 left-10 flex flex-col items-center">
                    <div className="mb-2 font-semibold">prosto_chel</div>
                    {/* Карты (вертикальная стопка) */}
                    <div className="flex flex-col space-y-2">
                        {/* Замените src на вашу карту или используйте разные картинки */}
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                    </div>
                </div>

                {/* Игрок справа (arthouse11) */}
                <div className="absolute top-24 right-10 flex flex-col items-center">
                    <div className="mb-2 font-semibold">arthouse11</div>
                    {/* Карты (вертикальная стопка) */}
                    <div className="flex flex-col space-y-2">
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                    </div>
                </div>

                {/* Игрок снизу слева (sasha2019) */}
                <div className="absolute bottom-20 left-20 flex flex-col items-center">
                    <div className="mb-2 font-semibold">sasha2019</div>
                    {/* Карты (горизонтальная раскладка) */}
                    <div className="flex space-x-2">
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                    </div>
                </div>

                {/* Игрок снизу по центру (Vanya) */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="mb-2 font-semibold">Vanya</div>
                    <div className="flex space-x-2">
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                        <img src="/assets/card-back.png" alt="card" className="w-12" />
                    </div>
                </div>

                {/* (Опционально) декоративная ящерица справа внизу */}
                <img
                    src="/assets/lizard.png"
                    alt="lizard"
                    className="absolute bottom-0 right-0 w-24 opacity-70"
                />
            </main>
        </div>
    );
};

export default GamePage;
