import React, { ReactNode, useState } from "react"

export const Confirm: React.FC<{
  onConfirm: () => void
  children: (isConfirmed: boolean) => ReactNode
}> = (props) => {
  const [isConfirmed, setIsConfirmed] = useState(false)

  return (
    <div
      onClick={() => {
        if (isConfirmed) {
          props.onConfirm()
          return setIsConfirmed(false)
        }

        setIsConfirmed(true)
      }}
    >
      {props.children(isConfirmed)}
    </div>
  )
}
