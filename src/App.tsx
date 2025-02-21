import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/authorization/LogingPage.tsx";
import RegisterPage from "./pages/authorization/./RegisterPage.tsx";
import LobbyPage from "./pages/LobbyPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import Menu from "./components/Menu.tsx";
import Deck from "./components/Deck.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/lobby" element={<LobbyPage />} />
                <Route path="/game/:gameId" element={
                    <GamePage
                        menu={<Menu/>}
                        deck={<Deck/>}
                    />}
                />


                <Route path="/deck" element={<Deck />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
