import { useState } from "react";
import { useNavigate } from "react-router";
import { useGameStore } from "../store/gameStore";
import { GameConfig } from "../types/game";

const StartScreen = () => {
  const [theme, setTheme] = useState<GameConfig["theme"]>("numbers");
  const [players, setPlayers] = useState<GameConfig["players"]>(1);
  const [gridSize, setGridSize] = useState<GameConfig["gridSize"]>(4);
  const setConfig = useGameStore((state) => state.setConfig);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-12 bg-blue-950 px-6 text-center">
      <h1 className="text-preset-5 text-grey-50">memory</h1>
      <main className="bg-grey-50 text-preset-11 flex w-full max-w-82 flex-col gap-6 rounded-xl p-6 text-blue-400">
        <fieldset className="">
          <legend className="mb-3 text-left">Select Theme</legend>
          <div className="text-grey-50 flex gap-2">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="numbers"
                checked={theme === "numbers"}
                onChange={(e) =>
                  setTheme(e.target.value as GameConfig["theme"])
                }
                className="peer hidden"
              />

              <span className="hover:bg-blue-350 block w-full rounded-full bg-blue-300 px-4 py-2 text-center transition peer-checked:bg-blue-800 peer-checked:text-white">
                Numbers
              </span>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="icons"
                checked={theme === "icons"}
                onChange={(e) =>
                  setTheme(e.target.value as GameConfig["theme"])
                }
                className="peer hidden"
              />
              <span className="hover:bg-blue-350 block w-full rounded-full bg-blue-300 px-4 py-2 text-center transition peer-checked:bg-blue-800 peer-checked:text-white">
                Icons
              </span>
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-left">Number of Players</legend>
          <div className="text-grey-50 flex gap-2">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="players"
                value={1}
                checked={players === 1}
                onChange={() => setPlayers(1)}
                className="peer hidden"
              />
              <span className="hover:bg-blue-350 block w-full rounded-full bg-blue-300 px-4 py-2 text-center transition peer-checked:bg-blue-800 peer-checked:text-white">
                1
              </span>
            </label>

            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="players"
                value={2}
                checked={players === 2}
                onChange={() => setPlayers(2)}
                className="peer hidden"
              />
              <span className="hover:bg-blue-350 block w-full rounded-full bg-blue-300 px-4 py-2 text-center transition peer-checked:bg-blue-800 peer-checked:text-white">
                2
              </span>
            </label>

            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="players"
                value={3}
                checked={players === 3}
                onChange={() => setPlayers(3)}
                className="peer hidden"
              />
              <span className="hover:bg-blue-350 block w-full rounded-full bg-blue-300 px-4 py-2 text-center transition peer-checked:bg-blue-800 peer-checked:text-white">
                3
              </span>
            </label>

            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="players"
                value={4}
                checked={players === 4}
                onChange={() => setPlayers(4)}
                className="peer hidden"
              />
              <span className="hover:bg-blue-350 block w-full rounded-full bg-blue-300 px-4 py-2 text-center transition peer-checked:bg-blue-800 peer-checked:text-white">
                4
              </span>
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-left">Grid Size</legend>
          <div className="text-grey-50 flex gap-2">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="gridSize"
                value={4}
                checked={gridSize === 4}
                onChange={() => setGridSize(4)}
                className="peer hidden"
              />
              <span className="hover:bg-blue-350 block w-full rounded-full bg-blue-300 px-4 py-2 text-center transition peer-checked:bg-blue-800 peer-checked:text-white">
                4x4
              </span>
            </label>

            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="gridSize"
                value={6}
                checked={gridSize === 6}
                onChange={() => setGridSize(6)}
                className="peer hidden"
              />
              <span className="hover:bg-blue-350 block w-full rounded-full bg-blue-300 px-4 py-2 text-center transition peer-checked:bg-blue-800 peer-checked:text-white">
                6x6
              </span>
            </label>
          </div>
        </fieldset>
        <button
          className="text-preset-9 w-full cursor-pointer rounded-full bg-orange-400 py-2 text-white transition hover:bg-orange-300"
          onClick={() => {
            setConfig({ theme, players, gridSize });
            navigate("/game");
          }}
          type="button"
        >
          Start Game
        </button>
      </main>
    </div>
  );
};

export default StartScreen;
