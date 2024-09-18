import { UserEntity } from "@foudroyer/interfaces"

declare global {
  interface Window {
    $crisp: Array<any>
    CRISP_WEBSITE_ID: string
  }
}

const CRISP_WEBSITE_ID = "1c38aa2d-7bd7-441e-8fb8-f8c9aedffc02"

export const startCrisp = () => {
  window.$crisp = []
  window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID

  const script = document.createElement("script")
  script.src = "https://client.crisp.chat/l.js"
  script.async = true

  document.body.appendChild(script)
}

export const getCrispUrl = (user?: UserEntity | null) => {
  if (!user)
    return `https://go.crisp.chat/chat/embed/?website_id=${CRISP_WEBSITE_ID}`
  return `https://go.crisp.chat/chat/embed/?website_id=${CRISP_WEBSITE_ID}&user_email=${user.email}&token_id=${user.id}&session_merge=true&crisp_sid=${user.id}&user_nickname=${user.id}`
}
