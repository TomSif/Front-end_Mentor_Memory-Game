import { cn } from "../lib/cn";
import { ICON_MAP } from "../lib/icon";

interface TileProps {
  onFlip: () => void;
  value: number | string;
  id: string;
  flippedIds: string[];
  isMatched: boolean;
}

function Tile({ onFlip, value, id, flippedIds, isMatched }: TileProps) {
  const Icon = ICON_MAP[value as string];
  return (
    <li className="flex h-full w-full">
      <button
        type="button"
        disabled={isMatched || flippedIds.length >= 2}
        onClick={onFlip}
        className="flex aspect-square h-full w-full cursor-pointer rounded-full outline-blue-800 focus:outline-offset-6 disabled:pointer-events-none"
        aria-label={
          isMatched
            ? `Matched, ${value}`
            : flippedIds.includes(id)
              ? `Flipped, ${value}`
              : "Hidden Tile"
        }
      >
        {isMatched || flippedIds.includes(id) ? (
          <span
            className={cn(
              "text-grey-50 flex h-full w-full items-center justify-center rounded-full transition-[background-color] duration-50 ease-in",
              isMatched ? "bg-orange-400" : "bg-blue-300",
            )}
          >
            {typeof value === "number" ? (
              value
            ) : Icon ? (
              <Icon size={48} strokeWidth={2} />
            ) : null}
          </span>
        ) : (
          <span className="hover:bg-blue-350! h-full w-full rounded-full bg-blue-800 transition-[background-color] duration-50 ease-in"></span>
        )}
      </button>
    </li>
  );
}

export default Tile;
