import { hotjar } from "react-hotjar"

export function startHotjar() {
  if (process.env.NODE_ENV === "production") hotjar.initialize(3596292, 6)
}
