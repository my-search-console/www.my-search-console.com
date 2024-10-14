export const getCallbackUrl = (type: "google" | "bing" | "yandex"): string => {
  return `${window.location.origin}/authentication/${type}/callback`
}
