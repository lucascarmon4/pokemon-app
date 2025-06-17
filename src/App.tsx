import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:name" element={<Details />} />
                <Route path="/favoritos" element={<Favorites />} />
            </Routes>
        </Router>
    );
}
