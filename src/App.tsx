import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/authorization/LogingForm.tsx";
import RegisterForm from "./components/authorization/RegisterForm.tsx";
import LobbyPage from "./pages/LobbyPage.tsx";
import GamePage from "./pages/GamePage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*/!*<Route path="/login" element={<LoginPage />} />*!/*/}

                {/*<Route path="/" element={<RegisterPage />} />*/}
                {/*/!*<Route path="/lobby" element={<LobbyPage />} />*!/*/}
                {/*/!*<Route path="/game/:gameId" element={<GamePage />} />*!/*/}


                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<RegisterForm />} />
                <Route path="/lobby" element={<LobbyPage />} />
                <Route path="/game/:gameId" element={<GamePage />} />
                <Route path="/" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
