export type SudokuGrid = (number | null)[][]
export type CellPosition = { row: number; col: number }

export interface SudokuGameState {
  grid: SudokuGrid
  originalGrid: SudokuGrid
  isValid: boolean
  isSolved: boolean
  isAnimating: boolean
  currentStep?: CellPosition
}
