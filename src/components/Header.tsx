interface HeaderProps {
  onStop: () => void;
  onMenuOpen: () => void;
  onStart: () => void;
  onReset: () => void;
  onNavigate: () => void;
}

function Header({
  onStop,
  onMenuOpen,
  onStart,
  onReset,
  onNavigate,
}: HeaderProps) {
  return (
    <header className="mb-18 flex items-center justify-between">
      <h1 className="text-preset-7 md:text-preset-4 text-blue-950">memory</h1>
      <button
        onClick={() => {
          onMenuOpen();
          onStop();
        }}
        type="button"
        className="text-preset-10 w-19.5 cursor-pointer rounded-full bg-orange-400 py-2 text-white transition hover:bg-orange-300 md:hidden"
      >
        Menu
      </button>
      <div className="hidden flex-row items-center gap-4 rounded-full md:flex">
        <button
          type="button"
          onClick={() => {
            onStart();
          }}
          className="text-preset-8 text-grey-50 rounded-full bg-orange-400 px-6 py-3 hover:bg-orange-300"
        >
          Restart
        </button>
        <button
          type="button"
          onClick={() => {
            onReset();
            onNavigate();
          }}
          className="text-preset-8 hover:bg-blue-350 rounded-full bg-blue-100 px-6 py-3 text-blue-950 hover:text-white"
        >
          New Game
        </button>
      </div>
    </header>
  );
}
export default Header;
