export interface SudokuBlock {
  value: number | null;
  group: string | null;
}

export const defaultBlock: SudokuBlock = {
  value: null,
  group: null,
};

export type SudoKuFieldType = Array<Array<SudokuBlock>>;

export const calculateGroup = (i: number, j: number): string => {
  // g_0.0 g_0.1 g_0.2
  // g_1.0 g_1.1 g_1.2
  // g_2.0 g_2.1 g_2.2
  return `g_${Math.floor(i/3)}.${Math.floor(j/3)}`
};

export const createSudokuField = (): SudoKuFieldType => (
  Array(9).fill(null).map((_, i) => (
    Array(9).fill(null).map((_, j)  => (
      { ...defaultBlock, group: calculateGroup(i, j) }
    ))
  ))
);
/**
 * [
 *  [
 *    { value: null, group: null },
 *    ...
 *  ]
 * ]
 */

export interface VerifyProps {
  value: number,
  rowNum: number,
  colNum: number,
  group: string,
  sudokuField: SudoKuFieldType,
}
export type VerifyByRowProps = Omit<VerifyProps, "colNum" | "group"> & Partial<Pick<VerifyProps, "colNum" | "group">>;
export type VerifyByColumnProps = Omit<VerifyProps, "rowNum" | "group"> & Partial<Pick<VerifyProps, "rowNum" | "group">>;
export type VerifyByGroupProps = Omit<VerifyProps, "colNum" | "rowNum"> & Partial<Pick<VerifyProps, "colNum" | "rowNum">>;

export const verify = ({
  value,
  rowNum,
  colNum,
  group,
  sudokuField,
}: VerifyProps): boolean => {
  return verifyByRow({ value, rowNum, sudokuField }) && verifyByColumn({ value, colNum, sudokuField }) && verifyByGroup({ value, group, sudokuField });
}

export const verifyByRow = ({
  value,
  rowNum,
  sudokuField,
}: VerifyByRowProps): boolean => {
  if (!value) {
    return false;
  }
  const calculatingRowValues = sudokuField[rowNum].map((block: SudokuBlock) => block.value);
  return !calculatingRowValues.includes(value);
};

export const verifyByColumn = ({
  value,
  colNum,
  sudokuField,
}: VerifyByColumnProps): boolean => {
  if (!value) {
    return false;
  }
  const calculatingColumnValues = sudokuField.map((row: Array<SudokuBlock>) => row[colNum].value);
  return !calculatingColumnValues.includes(value);
};

export const verifyByGroup = ({
  value,
  group,
  sudokuField,
}: VerifyByGroupProps): boolean => {
  if (!value) {
    return false;
  }
  const calculatingGroupValues = sudokuField.flat(2).filter((block) => block.group === group).map((block) => block.value);
  return !calculatingGroupValues.includes(value);
};
