import React from "react";
import "./card.css";


const CardBack: React.FC = () => {

    return (
        <div className="card-template">
            <img src="/images/lizard.png" alt="Логотип карты" className="lizard"/>
        </div>
    );
}

export default CardBack;