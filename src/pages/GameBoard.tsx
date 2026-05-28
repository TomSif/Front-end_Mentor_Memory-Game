import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/shallow";
import { useGameStore } from "../store/gameStore";
import { cn } from "../lib/cn";
import GameOverModal from "../components/GameOverModal";
import MenuModal from "../components/MenuModal";
import Tile from "../components/Tile";
import Header from "../components/Header";
import FooterSolo from "../components/FooterSolo";
import FooterMulti from "../components/FooterMulti";

const GameBoard = () => {
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { startGame, stopTimer, resumeTimer, resetGame, tick, flipTile } =
    useGameStore(
      useShallow((state) => ({
        startGame: state.startGame,
        stopTimer: state.stopTimer,
        resumeTimer: state.resumeTimer,
        resetGame: state.resetGame,
        tick: state.tick,
        flipTile: state.flipTile,
      })),
    );

  const {
    config,
    tiles,
    moves,
    score,
    isRunning,
    timeElapsed,
    flippedIds,
    phase,
    currentPlayerIndex,
  } = useGameStore(
    useShallow((state) => ({
      config: state.gameConfig,
      tiles: state.tiles,
      moves: state.moves,
      score: state.scores,
      isRunning: state.isRunning,
      timeElapsed: state.timeElapsed,
      flippedIds: state.flippedIds,
      phase: state.phase,
      currentPlayerIndex: state.currentPlayerIndex,
    })),
  );

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  const unRankedScore = score.map((score, index) => ({
    player: index + 1,
    score,
  }));

  const rankedPlayers =
    phase === "game-over"
      ? [...unRankedScore].sort((a, b) => b.score - a.score)
      : [];

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    if (!config) {
      navigate("/");
      return;
    }
    if (phase !== "setup") return;
    startGame();
  }, [config, phase, navigate, startGame]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  useEffect(() => {
    if (phase !== "game-over") return;
    setIsGameOverOpen(true);
  }, [phase]);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-277 bg-white p-6 sm:p-10 md:py-14">
      <Header
        onMenuOpen={() => setIsMenuOpen(true)}
        onStop={() => stopTimer()}
        onStart={() => startGame()}
        onReset={() => resetGame()}
        onNavigate={() => navigate("/")}
        isMenuOpen={isMenuOpen}
        menuButtonRef={menuButtonRef}
      />

      <main className="w-full md:px-15">
        <ul
          className={cn(
            "mx-auto grid w-full justify-items-center",
            config?.gridSize === 4 &&
              "text-preset-4 sm:text-preset-1 max-w-136 grid-cols-4 gap-3",
            config?.gridSize === 6 &&
              "text-preset-7 sm:text-preset-3 max-w-134 grid-cols-6 gap-2 gap-x-2",
          )}
        >
          {tiles.map((tile) => {
            return (
              <Tile
                key={tile.id}
                onFlip={() => flipTile(tile.id)}
                value={tile.value}
                id={tile.id}
                flippedIds={flippedIds}
                isMatched={tile.isMatched}
              />
            );
          })}
        </ul>
      </main>
      <footer className="mx-auto mt-21 flex w-full flex-col items-center md:max-w-279">
        {config?.players === 1 ? (
          <FooterSolo minutes={minutes} seconds={seconds} moves={moves} />
        ) : (
          <ul className="mx-auto flex w-full justify-center gap-6 md:gap-2">
            {unRankedScore.map((player) => {
              const isCurrentPlayer = player.player === currentPlayerIndex + 1;
              return (
                <FooterMulti
                  key={player.player}
                  isCurrentPlayer={isCurrentPlayer}
                  player={player.player}
                  score={player.score}
                />
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
          menuButtonRef.current?.focus();
        }}
        onRestart={() => {
          setIsMenuOpen(false);
          startGame();
          menuButtonRef.current?.focus();
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
