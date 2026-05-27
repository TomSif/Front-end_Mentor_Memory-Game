import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useGameStore } from "../store/gameStore";
import { cn } from "../lib/cn";
import GameOverModal from "../components/GameOverModal";
import MenuModal from "../components/MenuModal";
import Tile from "../components/Tile";
import Header from "../components/Header";
import FooterSolo from "../components/FooterSolo";

const GameBoard = () => {
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const startGame = useGameStore((state) => state.startGame);
  const stopTimer = useGameStore((state) => state.stopTimer);
  const resumeTimer = useGameStore((state) => state.resumeTimer);
  const resetGame = useGameStore((state) => state.resetGame);
  const tick = useGameStore((state) => state.tick);
  const flipTile = useGameStore((state) => state.flipTile);
  const config = useGameStore((state) => state.gameConfig);
  const tiles = useGameStore((state) => state.tiles);
  const moves = useGameStore((state) => state.moves);
  const score = useGameStore((state) => state.scores);
  const isRunning = useGameStore((state) => state.isRunning);
  const timeElapsed = useGameStore((state) => state.timeElapsed);
  const flippedIds = useGameStore((state) => state.flippedIds);
  const phase = useGameStore((state) => state.phase);
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex);

  const navigate = useNavigate();
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  const unRankedScore = score.map((score, index) => ({
    player: index + 1,
    score,
  }));

  const rankedPlayers = useMemo(() => {
    return [...unRankedScore].sort((a, b) => b.score - a.score);
  }, [unRankedScore]);

  useEffect(() => {
    if (phase === "playing" && tiles.length > 0) {
      // restored from localStorage — timer starts on first click
      return;
    }
    startGame();
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (phase !== "game-over") return;
    setIsGameOverOpen(true);
  }, [phase]);

  return (
    <div className="mx-auto min-h-dvh max-w-277 bg-white p-6 sm:p-10 md:p-16.5">
      <Header
        onMenuOpen={() => setIsMenuOpen(true)}
        onStop={() => stopTimer()}
        onStart={() => startGame()}
        onReset={() => resetGame()}
        onNavigate={() => navigate("/")}
      />

      <main className="w-full md:px-15">
        <ul
          className={cn(
            "mx-auto grid w-full justify-items-center",
            config?.gridSize === 4 &&
              "text-preset-4 sm:text-preset-1 max-w-136 grid-cols-4 gap-3",
            config?.gridSize === 6 &&
              "text-preset-7 sm:text-preset-3 max-w-143 grid-cols-6 gap-2 gap-x-2",
          )}
        >
          {tiles &&
            tiles.map((tile) => {
              return (
                <Tile
                  key={tile.id}
                  onFlip={() => flipTile(tile.id)}
                  value={tile.value}
                  id={tile.id}
                  flippedIds={flippedIds}
                  isMatched={tile.isMatched}
                />
              );
            })}
        </ul>
      </main>
      <footer className="mx-auto mt-25 w-full max-w-135 md:mt-26.5">
        {config?.players === 1 ? (
          <FooterSolo minutes={minutes} seconds={seconds} moves={moves} />
        ) : (
          <ul className="flex gap-6 md:gap-2">
            {unRankedScore.map((player) => {
              const isCurrentPlayer = player.player === currentPlayerIndex + 1;
              return (
                <li
                  key={player.player}
                  className={cn(
                    "maw-w-64 relative flex flex-1 flex-col items-center justify-evenly gap-2 rounded-md px-3 py-2.5 md:items-start md:px-4",
                    isCurrentPlayer ? "bg-orange-400" : "bg-blue-100",
                  )}
                >
                  {isCurrentPlayer && (
                    <span className="absolute -top-2 left-1/2 aspect-square w-4 -translate-x-1/2 rotate-45 bg-orange-400"></span>
                  )}
                  <span
                    className={cn(
                      "text-preset-11! sm:hidden",
                      isCurrentPlayer ? "text-white" : "text-blue-400",
                    )}
                  >
                    P{player.player}
                  </span>
                  <span
                    className={cn(
                      "text-preset-11! hidden sm:block",
                      isCurrentPlayer ? "text-white" : "text-blue-400",
                    )}
                  >
                    Player {player.player}
                  </span>
                  <span
                    className={cn(
                      "text-preset-7! text-center",
                      isCurrentPlayer ? "text-white" : "text-blue-800",
                    )}
                  >
                    {player.score}
                  </span>
                  <span
                    className={cn(
                      "text-preset-13! absolute -bottom-10 left-1/2 hidden w-full -translate-x-1/2 text-center font-bold text-blue-950",
                      isCurrentPlayer ? "sm:block" : "",
                    )}
                  >
                    CURRENT TURN
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </footer>
      <MenuModal
        isOpen={isMenuOpen}
        onResume={() => {
          setIsMenuOpen(false);
          resumeTimer();
        }}
        onRestart={() => {
          setIsMenuOpen(false);
          startGame();
        }}
        onNewGame={() => {
          resetGame();
          navigate("/");
        }}
      />
      {phase === "game-over" && (
        <GameOverModal
          isOpen={isGameOverOpen}
          onClose={() => setIsGameOverOpen(false)}
          onRestart={() => startGame()}
          onNewGame={() => {
            resetGame();
            navigate("/");
          }}
          moves={moves}
          score={score}
          minutes={minutes}
          seconds={seconds}
          rankedPlayers={rankedPlayers}
        />
      )}
    </div>
  );
};

export default GameBoard;
