import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/20/solid"
import React, { ReactNode } from "react"

function getEvolutionFromPreviousAndCurrentValues(options: {
  type: string
  previous: number
  current: number
}): string {
  const smaller = options.previous > options.current
  const bigger = options.previous < options.current
  if (options.type === "position") {
    if (smaller) return "up"
    if (bigger) return "down"
  }
  if (bigger) return "up"
  if (smaller) return "down"
  return "equal"
}

export function setArrowIcon(options: {
  type: string
  previous: number
  current: number
}): ReactNode {
  const evolution = getEvolutionFromPreviousAndCurrentValues({ ...options })
  if (evolution === "up") return <ArrowUpRightIcon className="h-6 w-6" />
  if (evolution === "down") return <ArrowDownRightIcon className="h-6 w-6" />
  if (evolution === "equal") return <ArrowRightIcon className="h-6 w-6" />
  return <ArrowRightIcon className="h-6 w-6" />
}

export function setEvolutionColor(options: {
  type: string
  previous: number
  current: number
}): string {
  switch (getEvolutionFromPreviousAndCurrentValues({ ...options })) {
    case "up":
      return "text-emerald-500"
    case "down":
      return "text-red-500"
    case "equal":
      return "text-slate-500"
    default:
      return "text-slate-500"
  }
}
