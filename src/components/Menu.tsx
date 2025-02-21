import React, { useState } from 'react';
import './styles/Menu.css'; // здесь будут стили

const Menu: React.FC = () => {
    // состояние, отвечающее за то, развернуто меню или свернуто
    const [expanded, setExpanded] = useState<boolean>(false);

    // обработчик клика для переключения меню
    const toggleMenu = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <div className={`menu-container ${expanded ? 'expanded' : 'collapsed'}`}>
            {/* Шапка меню: то, что видно в свернутом состоянии */}
            <div className="menu-header" onClick={toggleMenu}>
                <span>Круг: 1</span>
                <span>Фаза развитие</span>
                <span>00:05:30</span>
                <span>Профиль</span>
            </div>

            {/* Развёрнутая часть меню: видна только если expanded = true */}
            {expanded && (
                <nav className="menu-content">
                    <ul>
                        <li>Главная</li>
                        <li>К выбору партии</li>
                        <li>Правила игры</li>
                        <li>Пригласить игрока</li>
                        <li>Выйти из игры</li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Menu;