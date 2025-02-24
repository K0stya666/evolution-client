import React, {useState} from "react";
import "./card.css";
import {CardCondition, CardPerks, CardPerksImages} from "../../types/game.ts";

interface CardStats {
    condition: CardCondition;
    perk: CardPerks;
}

const Card: React.FC<CardStats> = ({ condition, perk }) => {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        setFlipped(!flipped);
    }

    return (
        <div className="flip-card" onClick={handleClick}>
            <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
                <div className="flip-card-front">
                    {/*<CardFront/>*/}
                    <div className="card-template">
                        {/*<p>hui</p>*/}
                        {condition && <div className="condition-overlay">{condition}</div>}
                        <div className="perk-overlay">
                            <img src={CardPerksImages[perk]} alt={perk} className="perk-icon"/>
                        </div>
                    </div>

                </div>
                <div className="flip-card-back">
                    {/*<CardBack/>*/}
                    <div className="card-template">
                        <img src="/images/lizard.png" alt="Логотип карты" className="lizard"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;