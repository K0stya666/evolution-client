import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css"; // если у вас есть общий файл стилей

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
