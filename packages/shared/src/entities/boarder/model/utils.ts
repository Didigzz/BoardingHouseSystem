// Boarder entity utilities

import type { Boarder } from "./types";

export function isBoarderActive(boarder: Boarder): boolean {
  return boarder.status === "ACTIVE";
}

export function formatBoarderName(boarder: Boarder): string {
  return `${boarder.name} (${boarder.email})`;
}
