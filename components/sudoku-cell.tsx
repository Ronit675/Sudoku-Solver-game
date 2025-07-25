"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"

interface SudokuCellProps {
  value: number | null
  onChange: (value: number | null) => void
  isReadOnly: boolean
  isHighlighted: boolean
  row: number
  col: number
}

export function SudokuCell({ value, onChange, isReadOnly, isHighlighted, row, col }: SudokuCellProps) {
  const [localValue, setLocalValue] = useState(value?.toString() || "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (newValue === "") {
      setLocalValue("")
      onChange(null)
    } else if (/^[1-9]$/.test(newValue)) {
      setLocalValue(newValue)
      onChange(Number.parseInt(newValue))
    }
  }

  const getBackgroundColor = () => {
    if (isHighlighted) return "bg-blue-200"
    if (isReadOnly) return "bg-gray-100"
    return "bg-white"
  }

  const getBorderClasses = () => {
    const classes = ["border"]

    // Thick borders for 3x3 box separation
    if (row % 3 === 0) classes.push("border-t-2")
    if (row % 3 === 2) classes.push("border-b-2")
    if (col % 3 === 0) classes.push("border-l-2")
    if (col % 3 === 2) classes.push("border-r-2")

    return classes.join(" ")
  }

  return (
    <Input
      type="text"
      value={value?.toString() || ""}
      onChange={handleChange}
      readOnly={isReadOnly}
      className={`
        w-12 h-12 text-center text-lg font-semibold p-0
        ${getBackgroundColor()}
        ${getBorderClasses()}
        border-gray-400
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition-colors duration-200
      `}
      maxLength={1}
    />
  )
}
