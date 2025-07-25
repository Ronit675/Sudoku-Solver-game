"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Play, Square, Zap } from "lucide-react"

import { SudokuGridComponent } from "./components/sudoku-grid"
import type { SudokuGameState, CellPosition } from "./types/sudoku"
import {
  solveSudoku,
  solveSudokuWithAnimation,
  isGridValid,
  createEmptyGrid,
  deepCopyGrid,
} from "./utils/sudoku-solver"
import { samplePuzzles } from "./data/sample-puzzles"

export default function SudokuSolverGame() {
  const [gameState, setGameState] = useState<SudokuGameState>({
    grid: createEmptyGrid(),
    originalGrid: createEmptyGrid(),
    isValid: true,
    isSolved: false,
    isAnimating: false,
  })

  const handleCellChange = useCallback(
    (row: number, col: number, value: number | null) => {
      if (gameState.isAnimating) return

      setGameState((prev) => {
        const newGrid = deepCopyGrid(prev.grid)
        newGrid[row][col] = value

        return {
          ...prev,
          grid: newGrid,
          isValid: isGridValid(newGrid),
          isSolved: false,
        }
      })
    },
    [gameState.isAnimating],
  )

  const loadPuzzle = (puzzleName: string) => {
    const puzzle = samplePuzzles.find((p) => p.name === puzzleName)
    if (puzzle) {
      const grid = deepCopyGrid(puzzle.grid)
      setGameState({
        grid,
        originalGrid: deepCopyGrid(grid),
        isValid: isGridValid(grid),
        isSolved: false,
        isAnimating: false,
      })
    }
  }

  const clearGrid = () => {
    const emptyGrid = createEmptyGrid()
    setGameState({
      grid: emptyGrid,
      originalGrid: emptyGrid,
      isValid: true,
      isSolved: false,
      isAnimating: false,
    })
  }

  const solveInstantly = () => {
    if (gameState.isAnimating) return

    const gridCopy = deepCopyGrid(gameState.grid)
    const solved = solveSudoku(gridCopy)

    if (solved) {
      setGameState((prev) => ({
        ...prev,
        grid: gridCopy,
        isSolved: true,
        isValid: true,
      }))
    }
  }

  const solveWithAnimation = async () => {
    if (gameState.isAnimating) return

    setGameState((prev) => ({ ...prev, isAnimating: true, currentStep: undefined }))

    const gridCopy = deepCopyGrid(gameState.grid)

    const onStep = async (position: CellPosition, value: number | null) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            grid: deepCopyGrid(gridCopy),
            currentStep: position,
          }))
          resolve()
        }, 50)
      })
    }

    const solved = await solveSudokuWithAnimation(gridCopy, onStep)

    setGameState((prev) => ({
      ...prev,
      grid: gridCopy,
      isSolved: solved,
      isValid: true,
      isAnimating: false,
      currentStep: undefined,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">Sudoku Solver Game</CardTitle>
            <div className="flex justify-center gap-4 mt-4">
              <Badge variant={gameState.isValid ? "default" : "destructive"}>
                {gameState.isValid ? "Valid" : "Invalid"}
              </Badge>
              {gameState.isSolved && (
                <Badge variant="default" className="bg-green-500">
                  Solved!
                </Badge>
              )}
              {gameState.isAnimating && <Badge variant="secondary">Solving...</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <Select onValueChange={loadPuzzle}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Load sample puzzle" />
                  </SelectTrigger>
                  <SelectContent>
                    {samplePuzzles.map((puzzle) => (
                      <SelectItem key={puzzle.name} value={puzzle.name}>
                        {puzzle.name} Puzzle
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={clearGrid}
                  variant="outline"
                  disabled={gameState.isAnimating}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Square className="w-4 h-4" />
                  Clear Grid
                </Button>
              </div>

              <SudokuGridComponent
                grid={gameState.grid}
                originalGrid={gameState.originalGrid}
                onCellChange={handleCellChange}
                highlightedCell={gameState.currentStep}
              />

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={solveInstantly}
                  disabled={gameState.isAnimating || !gameState.isValid}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Zap className="w-4 h-4" />
                  Solve Instantly
                </Button>

                <Button
                  onClick={solveWithAnimation}
                  disabled={gameState.isAnimating || !gameState.isValid}
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Play className="w-4 h-4" />
                  Solve with Animation
                </Button>
              </div>

              <div className="text-center text-gray-600 max-w-md">
                <p className="text-sm">
                  Fill in the grid manually or load a sample puzzle, then use the solve buttons to see the backtracking
                  algorithm in action. The animated solver shows each step of the solution process.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
