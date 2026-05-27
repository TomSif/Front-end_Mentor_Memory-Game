import { useEffect, useRef } from "react";

type MenuModalProps = {
  isOpen: boolean;
  onResume: () => void;
  onRestart: () => void;
  onNewGame: () => void;
};

function MenuModal({ isOpen, onResume, onRestart, onNewGame }: MenuModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      onCancel={(e) => {
        e.preventDefault();
        onResume();
      }}
      aria-labelledby="menuTitle"
      aria-modal="true"
      ref={dialogRef}
      id="menuModal"
      className="m-0 h-screen max-h-none min-h-dvh w-screen max-w-none scale-95 border-0 bg-transparent opacity-0 transition-all duration-200 backdrop:bg-black/50 backdrop:backdrop-blur-sm [[open]]:scale-100 [[open]]:opacity-100"
    >
      <div className="flex h-full items-center justify-center">
        <h2 id="menuTitle" className="sr-only">
          Menu Modale
        </h2>
        <div className="bg-grey-50 flex w-82 flex-col items-center gap-6 rounded-xl p-6 opacity-100">
          <button
            type="button"
            onClick={onRestart}
            className="text-preset-9 w-full rounded-full bg-orange-400 py-3 text-white hover:bg-orange-300"
          >
            Restart
          </button>
          <button
            type="button"
            onClick={onNewGame}
            className="text-preset-9 hover:bg-blue-350 text-blue-350 w-full rounded-full bg-blue-100 py-3 hover:text-white"
          >
            New Game
          </button>
          <button
            type="button"
            onClick={onResume}
            className="text-preset-9 hover:bg-blue-350 text-blue-350 w-full rounded-full bg-blue-100 py-3 hover:text-white"
          >
            Resume Game
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default MenuModal;
