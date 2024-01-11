declare global {
  interface Window {
    $crisp: Array<any>
    CRISP_WEBSITE_ID: string
  }
}

export const startCrisp = () => {
  window.$crisp = []
  window.CRISP_WEBSITE_ID = "b5235ee2-e9d5-4d06-9c92-488f64e57c8d"

  const script = document.createElement("script")
  script.src = "https://client.crisp.chat/l.js"
  script.async = true

  document.body.appendChild(script)
}
