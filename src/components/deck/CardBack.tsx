import React from "react";
import "./Card.css";


const CardBack: React.FC = () => {

    return (
        <div className="card-template">
            <img src="/images/lizard.png" alt="Логотип карты" className="lizard"/>
        </div>
    );
}

export default CardBack;