export const formatTime = (minutes: number, seconds: number): string =>
  `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
