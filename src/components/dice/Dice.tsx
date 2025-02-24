import React, { useState } from 'react';
import './Dice.css';

type PipPositions = {
    [key: number]: string[];
};

const pipPositions: PipPositions = {
    1: ['2 / 2'],
    2: ['1 / 1', '3 / 3'],
    3: ['1 / 1', '2 / 2', '3 / 3'],
    4: ['1 / 1', '1 / 3', '3 / 1', '3 / 3'],
    5: ['1 / 1', '1 / 3', '2 / 2', '3 / 1', '3 / 3'],
    6: ['1 / 1', '1 / 3', '2 / 1', '2 / 3', '3 / 1', '3 / 3']
};

const rollDice = (): number => Math.floor(Math.random() * 6) + 1;

const Dice: React.FC = () => {
    const [number, setNumber] = useState<number>(rollDice());
    const [rolling, setRolling] = useState<boolean>(false);

    const handleRoll = (): void => {
        setRolling(true);
        setTimeout(() => {
            setNumber(rollDice());
            setRolling(false);
        }, 300);
    };

    return (
        <div className="dice-container">
            <div className={`dice ${rolling ? 'rolling' : ''}`} onClick={handleRoll}>
                {Array.from({ length: 9 }).map((_, index) => {
                    const row = Math.floor(index / 3) + 1;
                    const col = (index % 3) + 1;
                    const gridArea = `${row} / ${col}`;
                    const showPip = pipPositions[number].includes(gridArea);
                    return (
                        <div key={index} className="cell">
                            {showPip && <div className="pip" />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dice;
