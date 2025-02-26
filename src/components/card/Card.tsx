import React, {useState} from "react";
import "./card.css";
import {Perk, Type, CardTypesImages} from "../../types/conditions.ts";

interface CardStats {
    condition: Perk;
    perk?: Type;
}


const Card: React.FC<CardStats> = ({condition, perk}) => {
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
                        <div className="condition-overlay">{condition}</div>
                        {perk && (
                            <div className="perk-overlay">
                                <img src={CardTypesImages[perk]} alt={perk} className="perk-icon"/>
                            </div>
                        )}
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