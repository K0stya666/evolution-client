import React, { useState } from 'react';
import './styles/Deck.css';

// interface Card {
//     id: number;
//     suit: string;
//     value: string;
// }

interface DeckProps {
    players: number;
    cardsPerPlayer: number;
}

export const Deck: React.FC<DeckProps> = ({ players = 4, cardsPerPlayer = 6 }) => {
    const [dealtCards, setDealtCards] = useState<number>(0);
    const totalCards = players * cardsPerPlayer;

    const handleDealCards = () => {
        if (dealtCards < totalCards) {
            setDealtCards(prev => prev + players);
        }
    };

    return (
        <div className="deck-container">
            <div className="deck" onClick={handleDealCards}>
                {[...Array(52 - dealtCards)].map((_, index) => (
                    <div
                        key={index}
                        className="card"
                        style={{
                            transform: `translateY(${index * 0.5}px)`,
                            zIndex: index,
                        }}
                    />
                ))}
            </div>

            {/* Dealt cards */}
            {[...Array(dealtCards)].map((_, index) => {
                const playerIndex = index % players;
                const angle = (360 / players) * playerIndex;
                const radius = 200; // Distance from center to dealt cards

                return (
                    <div
                        key={`dealt-${index}`}
                        className="card dealt-card"
                        style={{
                            transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
                            transitionDelay: `${index * 0.1}s`,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Deck;