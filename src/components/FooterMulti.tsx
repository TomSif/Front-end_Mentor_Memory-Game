import { cn } from "../lib/cn";

interface FooterMultiProps {
  player: number;
  isCurrentPlayer: boolean;
  score: number;
}

function FooterMulti({ player, isCurrentPlayer, score }: FooterMultiProps) {
  return (
    <li
      className={cn(
        "relative flex max-w-64 flex-1 flex-col items-center justify-evenly gap-2 rounded-md px-3 py-2.5 md:items-start md:px-4",
        isCurrentPlayer ? "bg-orange-400" : "bg-blue-100",
      )}
    >
      {isCurrentPlayer && (
        <span className="absolute -top-2 left-1/2 aspect-square w-4 -translate-x-1/2 rotate-45 bg-orange-400"></span>
      )}
      <span
        className={cn(
          "text-preset-11! sm:hidden",
          isCurrentPlayer ? "text-white" : "text-blue-400",
        )}
      >
        P{player}
      </span>
      <span
        className={cn(
          "text-preset-11! hidden sm:block",
          isCurrentPlayer ? "text-white" : "text-blue-400",
        )}
      >
        Player {player}
      </span>
      <span
        className={cn(
          "text-preset-7! text-center",
          isCurrentPlayer ? "text-white" : "text-blue-800",
        )}
      >
        {score}
      </span>
      <span
        className={cn(
          "text-preset-13! absolute -bottom-10 left-1/2 hidden w-full -translate-x-1/2 text-center font-bold text-blue-950",
          isCurrentPlayer ? "sm:block" : "",
        )}
      >
        CURRENT TURN
      </span>
    </li>
  );
}

export default FooterMulti;
