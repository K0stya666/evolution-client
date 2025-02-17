// // src/components/PlayerArea/PlayerArea.tsx
//
// import React from "react";
// import { Player } from "../types/game.ts";
//
// interface PlayerAreaProps {
//     player: Player;
// }
//
// const PlayerArea: React.FC<PlayerAreaProps> = ({ player }) => {
//     return (
//         <div className="player-area">
//             <h3>{player.username}</h3>
//             <div className="animals">
//                 {player.animals.map((animal) => (
//                     <div key={animal.id} className="animal">
//                         <p>Животное: {animal.id}</p>
//                         <p>
//                             Питание: {animal.foodEaten} / {animal.foodNeeded}
//                         </p>
//                         <div className="animal-cards">
//                             {animal.cards.map((card) => (
//                                 <div key={card.id} className="animal-card">
//                                     {card.title}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default PlayerArea;
