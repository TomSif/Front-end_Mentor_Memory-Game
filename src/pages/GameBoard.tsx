import { useEffect, useState, useMemo } from "react";
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
      <header className="mb-20 flex items-center justify-between md:pb-21.5">
        <h1 className="text-preset-7 md:text-preset-4 text-blue-950">memory</h1>
        <button
          onClick={() => {
            setIsMenuOpen(true);
            stopTimer();
          }}
          type="button"
          className="text-preset-10 w-19.5 cursor-pointer rounded-full bg-orange-400 py-2 text-white transition hover:bg-orange-300 md:hidden"
        >
          Menu
        </button>
        <div className="hidden flex-row items-center gap-4 rounded-full md:flex">
          <button
            type="button"
            onClick={() => {
              startGame();
            }}
            className="text-preset-8 text-grey-50 rounded-full bg-orange-400 px-6 py-3 hover:bg-orange-300"
          >
            Restart
          </button>
          <button
            type="button"
            onClick={() => {
              resetGame();
              navigate("/");
            }}
            className="text-preset-8 hover:bg-blue-350 rounded-full bg-blue-100 px-6 py-3 text-blue-950 hover:text-white"
          >
            New Game
          </button>
        </div>
      </header>

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
              const Icon = ICON_MAP[tile.value as string];
              return (
                <li className="flex h-full w-full" key={tile.id}>
                  <button
                    type="button"
                    disabled={tile.isMatched}
                    onClick={() => flipTile(tile.id)}
                    className="flex aspect-square h-full w-full cursor-pointer rounded-full outline-blue-800 focus:outline-offset-6"
                    aria-label={
                      tile.isMatched
                        ? `Matched, ${tile.value}`
                        : flippedIds.includes(tile.id)
                          ? `Flipped, ${tile.value}`
                          : "Hidden Tile"
                    }
                  >
                    {tile.isMatched || flippedIds.includes(tile.id) ? (
                      <span
                        className={cn(
                          "text-grey-50 flex h-full w-full items-center justify-center rounded-full transition-[background-color] duration-50 ease-in",
                          tile.isMatched ? "bg-orange-400" : "bg-blue-300",
                        )}
                      >
                        {typeof tile.value === "number" ? (
                          tile.value
                        ) : (
                          <Icon size={48} strokeWidth={2} />
                        )}
                      </span>
                    ) : (
                      <span className="hover:bg-blue-350! h-full w-full rounded-full bg-blue-800 transition-[background-color] duration-50 ease-in"></span>
                    )}
                  </button>
                </li>
              );
            })}
        </ul>
      </main>
      <footer className="mx-auto mt-25 w-full max-w-135 md:mt-26.5">
        {config?.players === 1 ? (
          <ul className="mt-27 flex w-full gap-6 md:gap-8">
            <li className="flex flex-1 flex-col justify-center rounded-lg bg-blue-100 py-3 text-center md:flex-row md:items-center md:justify-around md:py-4">
              <span className="text-preset-11 md:text-preset-9 text-blue-400">
                Time
              </span>
              <span className="text-preset-7 md:text-preset-5 text-blue-800">
                {`${minutes.toString().padStart(2, "0")}:${seconds
                  .toString()
                  .padStart(2, "0")}`}
              </span>
            </li>
            <li className="flex flex-1 flex-col justify-center gap-1 rounded-lg bg-blue-100 py-3 text-center md:flex-row md:items-center md:justify-around">
              <span className="text-preset-11 md:text-preset-9 text-blue-400">
                Moves
              </span>
              <span className="text-preset-7 md:text-preset-5 text-blue-800">
                {moves}
              </span>
            </li>
          </ul>
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
