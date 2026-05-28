import type { LucideIcon } from "lucide-react";
import {
  Bird,
  Cherry,
  Coffee,
  Egg,
  FlaskRound,
  Flower,
  Gamepad2,
  Gem,
  Ghost,
  Heart,
  IceCreamCone,
  ChessQueen,
  PawPrint,
  Pickaxe,
  Pizza,
  Squirrel,
  Star,
  Sword,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon | undefined> = {
  bird: Bird,
  cherry: Cherry,
  coffee: Coffee,
  egg: Egg,
  flaskround: FlaskRound,
  flower: Flower,
  gamepad: Gamepad2,
  gem: Gem,
  ghost: Ghost,
  heart: Heart,
  icecream: IceCreamCone,
  queen: ChessQueen,
  paw: PawPrint,
  axe: Pickaxe,
  pizza: Pizza,
  squirrel: Squirrel,
  star: Star,
  sword: Sword,
};

export const ICON_NAMES = Object.keys(ICON_MAP);
