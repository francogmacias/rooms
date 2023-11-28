import "./App.css";
import ChatRoom from "./pages/ChatRoom";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/room" element={<ChatRoom />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
