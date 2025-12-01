import { CONFIG } from "./config.js";

export function getRandomSeatId() {
  const row = String.fromCharCode(65 + Math.floor(Math.random() * CONFIG.SEAT_ROWS));
  const col = Math.floor(Math.random() * CONFIG.SEAT_COLS) + 1;
  return `${row}${col}`;
}
