interface FooterSoloProps {
  minutes: number;
  seconds: number;
  moves: number;
}

function FooterSolo({ minutes, seconds, moves }: FooterSoloProps) {
  return (
    <ul className="mt-27 flex w-full gap-6 md:gap-8">
      <li className="flex flex-1 flex-col justify-center rounded-lg bg-blue-100 py-3 text-center md:flex-row md:items-center md:justify-around md:py-4">
        <span className="text-preset-11 md:text-preset-9 text-blue-400">
          Time
        </span>
        <span className="text-preset-7 md:text-preset-5 text-blue-800">
          {`${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}
        </span>
      </li>
      <li className="flex flex-1 flex-col justify-center gap-1 rounded-lg bg-blue-100 py-3 text-center md:flex-row md:items-center md:justify-around">
        <span className="text-preset-11 md:text-preset-9 text-blue-400">
          Moves
        </span>
        <span className="text-preset-7 md:text-preset-5 text-blue-800">
          {moves}
        </span>
      </li>
    </ul>
  );
}
export default FooterSolo;
