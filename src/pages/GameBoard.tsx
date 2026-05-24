import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGameStore } from "../store/gameStore";
import { cn } from "../lib/cn";
import GameOverModal from "../components/GameOverModal";
import MenuModal from "../components/MenuModal";
import { ICON_MAP } from "../lib/icon";

const GameBoard = () => {
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const startGame = useGameStore((state) => state.startGame);
  const stopTimer = useGameStore((state) => state.stopTimer);
  const resumeTimer = useGameStore((state) => state.resumeTimer);
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
  const rankedPlayers = unRankedScore.sort((a, b) => b.score - a.score);

  useEffect(() => {
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
    <div className="mx-auto min-h-dvh max-w-277 bg-white p-6">
      <header className="mb-20 flex items-center justify-between">
        <h1 className="text-preset-7 text-blue-950">memory</h1>
        <button
          onClick={() => {
            setIsMenuOpen(true);
            stopTimer();
          }}
          type="button"
          className="text-preset-10 w-19.5 cursor-pointer rounded-full bg-orange-400 py-2 text-white transition hover:bg-orange-300"
        >
          Menu
        </button>
      </header>

      <main className="">
        <ul
          className={cn(
            "mx-auto grid w-full justify-items-center",
            config?.gridSize === 4 && "max-w-136 grid-cols-4 gap-3",
            config?.gridSize === 6 && "max-w-143 grid-cols-6 gap-2 gap-x-2",
          )}
        >
          {tiles &&
            tiles.map((tile) => {
              const Icon = ICON_MAP[tile.value as string];
              return (
                <li
                  className={cn(
                    "flex cursor-pointer rounded-full",
                    config?.gridSize === 4 && "h-18 w-18",
                    config?.gridSize === 6 &&
                      "h-11.5 w-11.5 xl:h-20.5 xl:w-20.5",
                  )}
                  key={tile.id}
                  onClick={() => flipTile(tile.id)}
                >
                  {tile.isMatched || flippedIds.includes(tile.id) ? (
                    <span
                      className={cn(
                        "text-preset-7 text-grey-50 flex h-full w-full items-center justify-center rounded-full",
                        tile.isMatched ? "bg-orange-400" : "bg-blue-300",
                      )}
                    >
                      {typeof tile.value === "number" ? tile.value : <Icon />}
                    </span>
                  ) : (
                    <span className="h-full w-full rounded-full bg-blue-800"></span>
                  )}
                </li>
              );
            })}
        </ul>
      </main>
      <footer className="mt-34.5 w-full">
        {config?.players === 1 ? (
          <ul className="mt-27 flex w-full gap-6">
            <li className="flex flex-1 flex-col justify-center rounded-lg bg-blue-100 py-3 text-center md:flex-row md:items-center md:justify-around">
              <span className="text-preset-11 text-blue-400">Time</span>
              <span className="text-preset-7 text-blue-800">
                {`${minutes.toString().padStart(2, "0")}:${seconds
                  .toString()
                  .padStart(2, "0")}`}
              </span>
            </li>
            <li className="flex flex-1 flex-col justify-center gap-1 rounded-lg bg-blue-100 py-3 text-center md:flex-row md:items-center md:justify-around">
              <span className="text-preset-11 text-blue-400">Moves</span>
              <span className="text-preset-7 text-blue-800">{moves}</span>
            </li>
          </ul>
        ) : (
          <ul className="flex gap-2">
            {unRankedScore.map((player) => {
              const isCurrentPlayer = player.player === currentPlayerIndex + 1;
              return (
                <li
                  key={player.player}
                  className={cn(
                    "maw-w-64 flex flex-1 flex-col gap-2 rounded-md px-4 py-2",
                    isCurrentPlayer ? "bg-orange-400" : "bg-blue-100",
                  )}
                >
                  <span
                    className={cn(
                      "text-preset-11! text-center",
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
        onNewGame={() => navigate("/")}
      />
      {phase === "game-over" && (
        <GameOverModal
          isOpen={isGameOverOpen}
          onClose={() => setIsGameOverOpen(false)}
          onRestart={() => startGame()}
          onNewGame={() => navigate("/")}
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
