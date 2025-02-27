import React, { useState } from 'react';
import '../../../public/styles/Deck.css';
import CardComponent from "../card/CardComponent.tsx";
import {Perk, Type} from "../../types/conditions.ts";

export interface CardData {
    condition: Perk;
    perk?: Type;
}

export interface Cards {
    cards: CardData[];
    // Функция обратного вызова для передачи раздданных карт пользователю
    onDeal?: (dealtCards: CardData[]) => void;
}

export const Deck: React.FC<Cards> = ({ cards, onDeal }) => {
    // Состояние колоды. При каждом раздаче обновляем колоду.
    const [deck, setDeck] = useState<CardData[]>(cards);

    // Функция раздачи карт: извлекаем numCards карт из начала колоды
    const dealCards = (numCards: number): CardData[] => {
        const dealt = deck.slice(0, numCards);
        setDeck(deck.slice(numCards));
        return dealt;
    };

    // Обработчик кнопки раздачи
    const handleDeal = () => {
        const dealtCards = dealCards(6);
        if (onDeal) {
            onDeal(dealtCards);
        }
    };

    return (
        <div className="deck-container">
            <div className="deck" onClick={handleDeal}>
                {/* Отображаем только верхние 5 карт для визуального эффекта стопки */}
                {deck.slice(0, 5).map((card, index) => (
                    <div
                        // key={card.id}
                        className="deck-card"
                        style={{
                            position: "absolute",
                            top: `${index * 2}px`,
                            left: `${index * 2}px`,
                            zIndex: deck.length - index,
                        }}
                    >
                        <CardComponent condition={card.condition} perk={card.perk} />
                    </div>
                ))}

            </div>

        </div>
    );
};

export default Deck;