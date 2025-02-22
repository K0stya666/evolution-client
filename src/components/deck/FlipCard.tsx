import React, {useState} from "react";
import Card from "./Card.tsx";
import CardBack from "./CardBack.tsx";

const FlipCard: React.FC = () => {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        setFlipped(!flipped);
    }

    return (
        <div className="flip-card" onClick={handleClick}>
            <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
                <div className="flip-card-front">
                    <Card/>
                </div>
                <div className="flip-card-back">
                    <CardBack/>
                </div>
            </div>
        </div>
    )
}

export default FlipCard;