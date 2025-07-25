"use client"

import { SudokuCell } from "./sudoku-cell"
import type { SudokuGrid, CellPosition } from "../types/sudoku"

interface SudokuGridProps {
  grid: SudokuGrid
  originalGrid: SudokuGrid
  onCellChange: (row: number, col: number, value: number | null) => void
  highlightedCell?: CellPosition
}

export function SudokuGridComponent({ grid, originalGrid, onCellChange, highlightedCell }: SudokuGridProps) {
  return (
    <div className="inline-block p-2 border-4 border-gray-800 bg-gray-800 rounded-lg">
      <div className="grid grid-cols-9 gap-0">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onChange={(value) => onCellChange(rowIndex, colIndex, value)}
              isReadOnly={originalGrid[rowIndex][colIndex] !== null}
              isHighlighted={highlightedCell?.row === rowIndex && highlightedCell?.col === colIndex}
              row={rowIndex}
              col={colIndex}
            />
          )),
        )}
      </div>
    </div>
  )
}
