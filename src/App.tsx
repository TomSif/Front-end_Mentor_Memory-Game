import { BrowserRouter, Routes, Route } from "react-router";
import StartScreen from "./pages/StartScreen";
import GameBoard from "./pages/GameBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game" element={<GameBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
