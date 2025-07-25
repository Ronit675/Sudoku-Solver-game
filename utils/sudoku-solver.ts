import type { SudokuGrid, CellPosition } from "../types/sudoku"

export function isValidPlacement(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) {
      return false
    }
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) {
      return false
    }
  }

  // Check 3x3 box
  const startRow = row - (row % 3)
  const startCol = col - (col % 3)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) {
        return false
      }
    }
  }

  return true
}

export function findEmptyCell(grid: SudokuGrid): CellPosition | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        return { row, col }
      }
    }
  }
  return null
}

export function solveSudoku(grid: SudokuGrid): boolean {
  const emptyCell = findEmptyCell(grid)

  if (!emptyCell) {
    return true // Puzzle solved
  }

  const { row, col } = emptyCell

  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      grid[row][col] = num

      if (solveSudoku(grid)) {
        return true
      }

      grid[row][col] = null // Backtrack
    }
  }

  return false
}

export async function solveSudokuWithAnimation(
  grid: SudokuGrid,
  onStep?: (position: CellPosition, value: number | null) => Promise<void>,
): Promise<boolean> {
  const emptyCell = findEmptyCell(grid)

  if (!emptyCell) {
    return true // Puzzle solved
  }

  const { row, col } = emptyCell

  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      grid[row][col] = num

      if (onStep) {
        await onStep({ row, col }, num)
      }

      if (await solveSudokuWithAnimation(grid, onStep)) {
        return true
      }

      grid[row][col] = null // Backtrack

      if (onStep) {
        await onStep({ row, col }, null)
      }
    }
  }

  return false
}

export function isGridValid(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col]
      if (num !== null) {
        // Temporarily remove the number to check if placement is valid
        grid[row][col] = null
        const valid = isValidPlacement(grid, row, col, num)
        grid[row][col] = num
        if (!valid) {
          return false
        }
      }
    }
  }
  return true
}

export function createEmptyGrid(): SudokuGrid {
  return Array(9)
    .fill(null)
    .map(() => Array(9).fill(null))
}

export function deepCopyGrid(grid: SudokuGrid): SudokuGrid {
  return grid.map((row) => [...row])
}
