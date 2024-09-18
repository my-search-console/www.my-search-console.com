export const getCallbackUrl = (type: "google" | "bing" | "yandex"): string => {
  return `${window.location.origin}/authentication/${type}/callback`
}

export const GET_GOOGLE_AUTH_URL = () =>
  `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fwebmasters.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=749607665220-nm0esgq5d60qi92s8svuevekktvdf150.apps.googleusercontent.com&redirect_uri=${getCallbackUrl(
    "google"
  )}`
