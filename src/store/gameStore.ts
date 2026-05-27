import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { Tile, GameConfig } from "../types/game";
import generateBoard from "../lib/generateBoard";
const FLIP_BACK_DELAY_MS = 500;

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
  checkMatch: () => void;
  tick: () => void;
  stopTimer: () => void;
  resumeTimer: () => void;
  resetGame: () => void;
  timeoutId: ReturnType<typeof setTimeout> | null;
}

const storeConfig: StateCreator<GameStore> = (set, get) => ({
  isRunning: false,
  moves: 0,
  scores: [],
  timeElapsed: 0,
  currentPlayerIndex: 0,
  phase: "setup" as const,
  flippedIds: [],
  tiles: [],
  gameConfig: null,
  timeoutId: null,
  tick: () => set((state) => ({ timeElapsed: state.timeElapsed + 1 })),
  stopTimer: () => set({ isRunning: false }),
  resumeTimer: () => set({ isRunning: true }),
  resetGame: () => {
    const timeId = get().timeoutId;
    if (timeId) clearTimeout(timeId);
    set({ phase: "setup", tiles: [] });
  },
  setConfig: (config: GameConfig) => set({ gameConfig: config }),
  startGame: () => {
    const timeId = get().timeoutId;
    const config = get().gameConfig;
    if (!config) return;
    const initialScores = Array.from({ length: config.players }, () => 0);
    if (timeId) clearTimeout(timeId);
    set({
      phase: "playing",
      tiles: generateBoard(config),
      timeElapsed: 0,
      scores: initialScores,
      moves: 0,
      flippedIds: [],
      currentPlayerIndex: 0,
      isRunning: false,
    });
  },
  flipTile: (id: string) => {
    const tileClicked = get().tiles.find((tile) => tile.id === id);
    if (tileClicked?.isMatched) return;
    if (!get().isRunning) set({ isRunning: true });
    if (get().flippedIds.length >= 2) return;
    if (get().flippedIds.includes(id)) return;
    set((state) => ({
      flippedIds: [...state.flippedIds, id],
    }));
    if (get().flippedIds.length === 2) {
      get().checkMatch();
    }
  },
  checkMatch: () => {
    const { flippedIds, tiles } = get();
    if (flippedIds.length !== 2) return;
    const [id1, id2] = flippedIds;
    const tile1 = tiles.find((t) => t.id === id1)!;
    const tile2 = tiles.find((t) => t.id === id2)!;
    set((state) => ({ moves: state.moves + 1 }));
    if (tile1.value === tile2.value) {
      set((state) => {
        const newScore = [...state.scores];
        newScore[state.currentPlayerIndex] =
          newScore[state.currentPlayerIndex] + 1;
        const newTiles = state.tiles.map((tile) =>
          tile.id === id1 || tile.id === id2
            ? {
                ...tile,
                isMatched: true,
              }
            : tile,
        );
        const isGameOver = newTiles.every((tile) => tile.isMatched);
        return {
          phase: isGameOver ? "game-over" : "playing",
          isRunning: isGameOver ? false : state.isRunning,
          tiles: newTiles,
          flippedIds: [],
          scores: newScore,
        };
      });
    } else {
      const timeoutId = setTimeout(() => {
        set((state) => ({
          flippedIds: [],
          currentPlayerIndex:
            (state.currentPlayerIndex + 1) % (get().gameConfig?.players ?? 1),
        }));
      }, FLIP_BACK_DELAY_MS);
      set({ timeoutId });
    }
  },
});

export const useGameStore = create<GameStore>()(
  persist(storeConfig, {
    name: "game-store",
    version: 1,
    migrate: (saveState, savedVersion) => {
      if (savedVersion < 1) {
        return {
          ...(saveState as GameStore),
          phase: "setup",
          tiles: [],
          isRunning: false,
        };
      }
      return saveState as GameStore;
    },
    partialize: (state) => ({ ...state, isRunning: false }),
  }),
);
