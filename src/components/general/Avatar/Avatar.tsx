import BoringAvatars from "boring-avatars"
import React from "react"

export const Avatar: React.FC<{ size?: number; name: string }> = (props) => (
  <BoringAvatars
    size={props.size || 48}
    name={props.name || ""}
    variant="beam"
    colors={["#fae8ff", "#dcfce7", "#fbcfe8", "#f3e8ff", "#fef9c3", "#fee2e2"]}
  />
)
