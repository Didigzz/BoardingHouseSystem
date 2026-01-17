export interface GetBoarderStatsQuery {
  // No parameters needed
}

export type BoarderStats = {
  total: number;
  active: number;
  inactive: number;
};