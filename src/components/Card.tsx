// // src/components/Card/Card.tsx
//
// import React from "react";
// import { Card as CardType } from "../types/game.ts";
//
// interface CardProps {
//     card: CardType;
//     onPlayCard?: (cardId: string) => void;
// }
//
// const Card: React.FC<CardProps> = ({ card, onPlayCard }) => {
//     const handlePlay = () => {
//         if (onPlayCard) {
//             onPlayCard(card.id);
//         }
//     };
//
//     return (
//         <div className="card">
//             <p>hui</p>
//             <h4>{card.title}</h4>
//             <p>{card.description}</p>
//             {onPlayCard && (
//                 <button onClick={handlePlay}>Сыграть карту</button>
//             )}
//         </div>
//     );
// };
//
// export default Card;
