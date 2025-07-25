import type { SudokuGrid } from "../types/sudoku"

export const samplePuzzles: { name: string; grid: SudokuGrid }[] = [
  {
    name: "Easy",
    grid: [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9],
    ],
  },
  {
    name: "Medium",
    grid: [
      [null, 2, null, 6, null, 8, null, null, null],
      [5, 8, null, null, null, 9, 7, null, null],
      [null, null, null, null, 4, null, null, null, null],
      [3, 7, null, null, null, null, 5, null, null],
      [6, null, null, null, null, null, null, null, 4],
      [null, null, 8, null, null, null, null, 1, 3],
      [null, null, null, null, 2, null, null, null, null],
      [null, null, 9, 8, null, null, null, 3, 6],
      [null, null, null, 3, null, 6, null, 9, null],
    ],
  },
  {
    name: "Hard",
    grid: [
      [null, null, null, 6, null, null, 4, null, null],
      [7, null, null, null, null, 3, 6, null, null],
      [null, null, null, null, 9, 1, null, 8, null],
      [null, null, null, null, null, null, null, null, null],
      [null, 5, null, 1, 8, null, null, null, 3],
      [null, null, null, 3, null, 6, null, 4, 5],
      [null, 4, null, 2, null, null, null, 6, null],
      [9, null, 3, null, null, null, null, null, null],
      [null, 2, null, null, null, null, 1, null, null],
    ],
  },
]
