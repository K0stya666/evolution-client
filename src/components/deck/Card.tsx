import React from "react";
import "./card.css";

export interface Card {
    title: string;
    description: string;
    extraFoodNeeded?: number;
}

const Card: React.FC = () => {


    return (
        <div className="card-template">
            <p>hui</p>
        </div>
    );
};

export default Card;
