import React, { useState } from 'react';
import '../../public/styles/Menu.css';
import {Player} from "../types/entities.ts";
import {gameApi} from "../services/api.ts";

const Menu: React.FC = () => {
    // const [player, setPlayer] = useState<Player>();
    const [expanded, setExpanded] = useState<boolean>(false);

    // const fetchPlayer = async () => {
    //     const data = await gameApi.getPlayers();
    //     setPlayer(data)
    // }

    const toggleMenu = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <div className={`menu-container ${expanded ? 'expanded' : 'collapsed'}`}>

            {/* Иконка-гамбургер */}
            <div className="hamburger-icon" onClick={toggleMenu}>
                <div />
                <div />
                <div />
            </div>

            {/* Шапка меню: то, что видно в свернутом состоянии */}
            <div className="menu-header">
                <span>Круг: 1</span>
                <span>Фаза развитие</span>
                <span>00:05:30</span>
                <span>{ localStorage.getItem('login') || 'Профиль' }</span>
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
