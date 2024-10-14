export function isUrlValidForFoudroyer(params: { url: string }) {
  const regex = /\/[a-z0-9A-Z-%?=&]+$/
  if (params.url.match(regex)) {
    return false
  }
  return true
}
