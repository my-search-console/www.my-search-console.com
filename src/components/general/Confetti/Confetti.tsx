import ConfettiGenerator from "confetti-js"
import React, { useEffect } from "react"

const Canva: React.FC<{ respawn: boolean; speed?: number }> = (props) => {
  useEffect(() => {
    const confettiSettings = {
      target: "confetti",
      clock: props.speed || 20,
      rotate: true,
      max: 80,
      start_from_edge: true,
      respawn: props.respawn,
    }

    const confetti = new ConfettiGenerator(confettiSettings)
    confetti.render()

    return () => confetti.clear()
  }, [])

  return (
    <canvas
      id="confetti"
      className="fixed inset-0 z-40 h-full w-full select-none"
      style={{
        pointerEvents: "none",
      }}
    />
  )
}

export const Confetti: React.FC<{
  isOpen: boolean
  respawn: boolean
  speed?: number
}> = (props) => {
  return props.isOpen ? (
    <Canva respawn={props.respawn} speed={props.speed} />
  ) : (
    <></>
  )
}
