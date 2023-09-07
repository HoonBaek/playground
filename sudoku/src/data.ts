import { SudokuBlock, SudokuGroup, SudokuIndex, SudokuNumber } from "./types";

export const defaultBlock: SudokuBlock = {
  value: null,
  group: null,
};

export type SudoKuFieldType = Array<Array<SudokuBlock>>;
export const createSudokuField = (): SudoKuFieldType => Array(9).map(() => Array(9).map(() => ({ ...defaultBlock })));

export interface VerifyProps {
  value: SudokuNumber,
  rowNum: SudokuIndex,
  colNum: SudokuIndex,
  group: SudokuGroup,
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
