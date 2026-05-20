export interface Tile {
  id: string;
  value: string | number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameConfig {
  theme: "numbers" | "icons";
  players: 1 | 2 | 3 | 4;
  gridSize: 4 | 6;
}
