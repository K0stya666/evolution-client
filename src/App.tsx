import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/authorization/LogingPage.tsx";
import RegisterPage from "./pages/authorization/./RegisterPage.tsx";
import LobbyPage from "./pages/LobbyPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import Deck from "./components/deck/Deck.tsx";
import CardComponent from "./components/card/CardComponent.tsx";
import Dice from "./components/dice/Dice.tsx";
import {deck, Perk, Type} from "./types/conditions.ts";



function App() {

    const handleDeal = (dealtCards: any[]) => {
        console.log("Разданные карты:", dealtCards);
        // Здесь можно реализовать логику распределения карт между игроками
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/lobby" element={<LobbyPage />} />
                <Route path="/game/:gameId" element={
                    <GamePage/>}
                />

                <Route path="/game" element={
                    <GamePage/>}
                />

                <Route path="/card" element={
                    <CardComponent
                        condition={Perk.SWIMMING}
                        perk={Type.FAT_TISSUE}
                    />
                }/>


                <Route path="/dice" element={<Dice/>} />
                <Route path="/deck" element={
                    <Deck
                        cards={deck}
                        onDeal={handleDeal}
                    />
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
