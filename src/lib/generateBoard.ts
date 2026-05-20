import { Tile } from "../types/game";

export interface GenerateBoardProps {
  theme: number | string;
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

const generateBoard = ({ theme: _theme, gridSize }: GenerateBoardProps) => {
  const arr = Array.from(
    { length: (gridSize * gridSize) / 2 },
    (_, i) => i + 1,
  );
  const newArr = [...arr, ...arr];
  const shuffleValues = shuffle(newArr);
  const tiles: Tile[] = shuffleValues.map((tile, index) => ({
    id: `tile-${index}`,
    value: tile,
    isFlipped: false,
    isMatched: false,
  }));
  return tiles;
};

export default generateBoard;
