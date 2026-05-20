import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { cn } from "../lib/cn";

const GameBoard = () => {
  const startGame = useGameStore((state) => state.startGame);
  const config = useGameStore((state) => state.gameConfig);
  const tiles = useGameStore((state) => state.tiles);
  const flipTile = useGameStore((state) => state.flipTile);

  useEffect(() => {
    startGame();
  }, []);
  return (
    <div className="min-h-dvh bg-white p-6">
      <header className="mb-20 flex items-center justify-between">
        <h1 className="text-preset-7 text-blue-950">memory</h1>
        <button
          type="button"
          className="text-preset-10 cursor-pointer rounded-full bg-orange-400 py-2 text-white transition hover:bg-orange-300"
        >
          Menu
        </button>
      </header>

      <main>
        <ul
          className={cn(
            "grid w-full",
            config?.gridSize === 4 && "grid-cols-4 gap-3",
            config?.gridSize === 6 && "grid-cols-6 gap-2",
          )}
        >
          {tiles &&
            tiles.map((tile) => {
              return (
                <li
                  className={cn(
                    "flex rounded-full",
                    config?.gridSize === 4 && "h-18 w-18",
                    config?.gridSize === 6 && "h-11.5 w-11.5",
                  )}
                  key={tile.id}
                  onClick={() => flipTile(tile.id)}
                >
                  {tile.isFlipped ? (
                    <span
                      className={cn(
                        "text-preset-7 text-grey-50 flex h-full w-full items-center justify-center rounded-full",
                        tile.isMatched ? "bg-orange-400" : "bg-blue-300",
                      )}
                    >
                      {tile.value}
                    </span>
                  ) : (
                    <span className="h-full w-full rounded-full bg-blue-800"></span>
                  )}
                </li>
              );
            })}
        </ul>
      </main>
    </div>
  );
};

export default GameBoard;
