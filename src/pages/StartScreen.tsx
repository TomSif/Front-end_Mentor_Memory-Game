import { useState } from "react";
import { useNavigate } from "react-router";
import { useGameStore } from "../store/gameStore";
import { GameConfig } from "../types/game";
import RadioOptions from "../components/RadioOptions";

const StartScreen = () => {
  const [theme, setTheme] = useState<GameConfig["theme"]>("numbers");
  const [players, setPlayers] = useState<GameConfig["players"]>(1);
  const [gridSize, setGridSize] = useState<GameConfig["gridSize"]>(4);
  const setConfig = useGameStore((state) => state.setConfig);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-12 bg-blue-950 px-6 text-center md:gap-20">
      <h1 className="text-preset-5 md:text-preset-4 text-grey-50">memory</h1>
      <main className="bg-grey-50 text-preset-11 md:text-preset-6 flex w-full max-w-82 flex-col gap-6 rounded-xl p-6 text-blue-400 sm:max-w-163 md:gap-8 md:px-13.5 md:py-14">
        <fieldset className="">
          <legend className="md:text-preset-8 mb-3 text-left md:mb-4">
            Select Theme
          </legend>
          <div className="text-grey-50 flex gap-2 md:gap-8">
            <RadioOptions
              name={"theme"}
              value={"numbers"}
              checked={theme === "numbers"}
              onChange={(v) => setTheme(v as GameConfig["theme"])}
              children="Numbers"
            />
            <RadioOptions
              name={"theme"}
              value={"icons"}
              checked={theme === "icons"}
              onChange={(v) => setTheme(v as GameConfig["theme"])}
              children="Icons"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend className="md:text-preset-8 mb-3 text-left md:mb-4">
            Number of Players
          </legend>
          <div className="text-grey-50 flex gap-2 md:gap-6">
            <RadioOptions
              name={"players"}
              value={1}
              checked={players === 1}
              onChange={(v) => setPlayers(v as GameConfig["players"])}
              children="1"
            />
            <RadioOptions
              name={"players"}
              value={2}
              checked={players === 2}
              onChange={(v) => setPlayers(v as GameConfig["players"])}
              children="2"
            />
            <RadioOptions
              name={"players"}
              value={3}
              checked={players === 3}
              onChange={(v) => setPlayers(v as GameConfig["players"])}
              children="3"
            />
            <RadioOptions
              name={"players"}
              value={4}
              checked={players === 4}
              onChange={(v) => setPlayers(v as GameConfig["players"])}
              children="4"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend className="md:text-preset-8 mb-3 text-left md:mb-4">
            Grid Size
          </legend>
          <div className="text-grey-50 flex gap-2 md:gap-8">
            <RadioOptions
              name={"gridSize"}
              value={4}
              checked={gridSize === 4}
              onChange={(v) => setGridSize(v as GameConfig["gridSize"])}
              children="4x4"
            />
            <RadioOptions
              name={"gridSize"}
              value={6}
              checked={gridSize === 6}
              onChange={(v) => setGridSize(v as GameConfig["gridSize"])}
              children="6x6"
            />
          </div>
        </fieldset>
        <button
          className="text-preset-9 md:text-preset-5 w-full cursor-pointer rounded-full bg-orange-400 py-2 text-white transition hover:bg-orange-300 md:py-4"
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
