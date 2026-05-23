import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";

type ModalProps = {
  isOpen: boolean;
  score: number[];
  moves: number;
  minutes: number;
  seconds: number;
  rankedPlayers: { player: number; score: number }[];
  onClose: () => void;
  onRestart: () => void;
  onNewGame: () => void;
};

function GameOverModal({
  isOpen,
  onClose,
  onRestart,
  onNewGame,
  minutes,
  seconds,
  moves,
  score,
  rankedPlayers,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const winners = rankedPlayers.filter(
    (winner) => winner.score === rankedPlayers[0].score,
  );
  const isTie = winners.length > 1;

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      id="modal"
      className="m-0 flex h-screen max-h-none min-h-dvh w-screen max-w-none scale-95 items-center justify-center border-0 bg-transparent opacity-0 transition-all duration-200 backdrop:bg-black/50 backdrop:backdrop-blur-sm [[open]]:scale-100 [[open]]:opacity-100"
    >
      <div className="bg-grey-50 flex w-82 flex-col items-center gap-6 p-6 opacity-100">
        <section>
          {score.length === 1 ? (
            <h2 className="text-preset-7 text-center text-blue-950">
              You did it
            </h2>
          ) : !isTie ? (
            <h2 className="text-preset-7 text-center text-blue-950">
              Player {rankedPlayers[0].player} Wins
            </h2>
          ) : (
            <h2 className="text-preset-7 text-center text-blue-950">
              It's a tie!
            </h2>
          )}
          <p className="text-preset-12 text-blue-400">
            Game over! Here’s how you got on…
          </p>
        </section>
        <section className="w-full">
          {score.length === 1 ? (
            <ul className="flex w-full flex-col gap-2">
              <li className="flex w-full items-center justify-between rounded-md bg-blue-100 px-4 py-3">
                <span className="text-preset-12 text-left text-blue-400">
                  Time Elapsed
                </span>
                <span className="text-preset-8 text-right text-blue-800">
                  {`${minutes.toString().padStart(2, "0")}:${seconds
                    .toString()
                    .padStart(2, "0")}`}
                </span>
              </li>
              <li className="flex w-full items-center justify-between rounded-md bg-blue-100 px-4 py-3">
                <span className="text-preset-12 text-left text-blue-400">
                  Moves Taken
                </span>
                <span className="text-preset-8 text-right text-blue-800">
                  {moves}
                </span>
              </li>
            </ul>
          ) : (
            <ul className="flex w-full flex-col gap-2">
              {rankedPlayers &&
                rankedPlayers.map((players) => {
                  const isWinner = winners.some(
                    (w) => w.player === players.player,
                  );
                  return (
                    <li
                      key={players.player}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md bg-blue-100 px-4 py-3",
                        isWinner ? "bg-blue-950 text-white!" : "",
                      )}
                    >
                      <span
                        className={cn(
                          "text-preset-12 text-left text-blue-400",
                          isWinner ? "text-white" : "",
                        )}
                      >
                        Player {players.player}{" "}
                        {isWinner ? <span>(Winner!)</span> : ""}
                      </span>
                      <span
                        className={cn(
                          "text-preset-8 text-right text-blue-800",
                          isWinner ? "text-white" : "",
                        )}
                      >
                        {players.score ?? 0} Pairs
                      </span>
                    </li>
                  );
                })}
            </ul>
          )}
        </section>
        <section className="text-preset-9 flex w-full flex-col items-center gap-4 text-center">
          <button
            type="button"
            onClick={() => {
              onRestart();
              onClose();
            }}
            className="w-full rounded-full bg-orange-400 py-3 text-white"
          >
            Restart
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onNewGame();
            }}
            className="w-full rounded-full bg-blue-100 py-3 text-blue-800"
          >
            Setup New Game
          </button>
        </section>
      </div>
    </dialog>
  );
}

export default GameOverModal;
