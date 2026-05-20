import { create } from "zustand";
import { Tile, GameConfig } from "../types/game";
import generateBoard from "../lib/generateBoard";

export interface GameStore {
  tiles: Tile[];
  gameConfig: GameConfig | null;
  isRunning: boolean;
  flippedIds: string[];
  phase: "setup" | "playing" | "game-over";
  moves: number;
  scores: number[];
  currentPlayerIndex: number;
  timeElapsed: number;
  setConfig: (config: GameConfig) => void;
  startGame: () => void;
  flipTile: (id: string) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  isRunning: false,
  moves: 0,
  scores: [],
  timeElapsed: 0,
  currentPlayerIndex: 0,
  phase: "setup",
  flippedIds: [],
  tiles: [],
  gameConfig: null,
  setConfig: (config: GameConfig) => set({ gameConfig: config }),
  startGame: () => {
    const config = get().gameConfig;
    if (!config) return;
    set({ phase: "playing", tiles: generateBoard(config) });
  },
  flipTile: (id: string) =>
    set((state) => ({
      flippedIds: [...state.flippedIds, id],

      tiles: state.tiles.map((tile) =>
        tile.id === id ? { ...tile, isFlipped: true } : tile,
      ),
    })),
}));
