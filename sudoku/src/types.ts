export type SudokuIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type SudokuNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export enum SudokuGroup {
  A = 'groupA',
  B = 'groupB',
  C = 'groupC',
  D = 'groupD',
  E = 'groupE',
  F = 'groupF',
  G = 'groupG',
  H = 'groupH',
  I = 'groupI',
}

export interface SudokuBlock {
  value: SudokuNumber | null;
  group: SudokuGroup | null;
}
