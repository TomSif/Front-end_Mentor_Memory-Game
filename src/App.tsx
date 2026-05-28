import { BrowserRouter, Routes, Route } from "react-router";
import StartScreen from "./pages/StartScreen";
import GameBoard from "./pages/GameBoard";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route
          path="/game"
          element={
            <ErrorBoundary
              fallback={<p>An error occurred. Please reload the page.</p>}
            >
              <GameBoard />
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
