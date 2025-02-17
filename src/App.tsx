import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import LobbyPage from "./pages/LobbyPage";
// import GamePage from "./pages/GamePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*<Route path="/login" element={<LoginPage />} />*/}

                <Route path="/" element={<RegisterPage />} />
                {/*<Route path="/lobby" element={<LobbyPage />} />*/}
                {/*<Route path="/game/:gameId" element={<GamePage />} />*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
