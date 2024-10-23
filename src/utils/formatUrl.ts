export const formatUrl = (url: string) => {
  try {
    const formatted = decodeURIComponent(
      url.replace(/https?:\/\/[a-z0-9\-_.]+/, "")
    )
    if (formatted === "") return "/"
    return formatted
  } catch (e) {
    return url
  }
}
