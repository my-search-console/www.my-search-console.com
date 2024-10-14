import { isUrlValidForFoudroyer } from "../isUrlValidForFoudroyer"

const badUrls = [
  "https://www.google.com/bonjour",
  "https://www.google.com/bonjour/coucou",
  "https://www.google.com/coucou/coucou",
  "https://www.google.com/bonjour/coucou89",
  "https://www.google.com/bonjour/coucou-89",
  "https://www.google.com/bonjour/coucou-C89",
  "https://www.google.com/bonjour/coucou-C89%",
  "google.com/cbonjour?=&",
]

describe("isUrlValidForFoudroyer test suite", () => {
  it("Renvoie TRUE si le pathName d'un URL est vide", () => {
    const res = isUrlValidForFoudroyer({ url: "www.google.com" })
    expect(res).toEqual(true)
  })

  it("Renvoie FALSE si le pathName d'un URL existe", () => {
    const res = isUrlValidForFoudroyer({ url: "www.google.com/bonjour" })
    expect(res).toEqual(false)
  })

  it("Renvoie FALSE si le pathName d'un URL existe et commence par https", () => {
    const res = isUrlValidForFoudroyer({
      url: "https://www.google.com/bonjour",
    })
    expect(res).toEqual(false)
  })

  it("Renvoie FALSE si le pathName d'un URL contient 2 sous-dossiers", () => {
    const res = isUrlValidForFoudroyer({
      url: "https://www.google.com/bonjour/coucou",
    })
    expect(res).toEqual(false)
  })

  it("Renvoie FALSE pour tous ces URLs nuls", () => {
    badUrls.forEach((url) => {
      const res = isUrlValidForFoudroyer({
        url,
      })
      expect(res).toEqual(false)
    })
  })
})
