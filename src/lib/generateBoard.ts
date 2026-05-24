import { Tile } from "../types/game";
import { ICON_NAMES } from "./icon";

export interface GenerateBoardProps {
  theme: "numbers" | "icons";
  gridSize: 4 | 6;
}

const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const generateBoard = ({ theme, gridSize }: GenerateBoardProps) => {
  const n = (gridSize * gridSize) / 2;
  const arr =
    theme === "numbers"
      ? Array.from({ length: n }, (_, i) => i + 1)
      : ICON_NAMES.slice(0, n);
  const newArr = [...arr, ...arr];
  const shuffleValues = shuffle(newArr);
  const tiles: Tile[] = shuffleValues.map((tile, index) => ({
    id: `tile-${index}`,
    value: tile,
    isMatched: false,
  }));
  return tiles;
};

export default generateBoard;
