import { normalizeUrl } from "../normalizeUrl"

describe("normalizeUrl test suite", () => {
  it("la fonction doit retourner une url avec la langue FR d'ajouté", () => {
    const normalized = normalizeUrl({
      locale: "fr",
      url: "https://www.sudoku.academy/blog/",
    })

    expect(normalized).toEqual("https://www.sudoku.academy/fr/blog/")
  })

  it("la fonction doit retourner une url avec la langue PT d'ajouté", () => {
    const normalized = normalizeUrl({
      locale: "pt",
      url: "https://www.sudoku.academy/blog/",
    })

    expect(normalized).toEqual("https://www.sudoku.academy/pt/blog/")
  })

  it("la fonction doit retourner une url avec la langue EN d'ajouté", () => {
    const normalized = normalizeUrl({
      locale: "en",
      url: "https://www.sudoku.academy/blog/",
    })

    expect(normalized).toEqual("https://www.sudoku.academy/blog/")
  })

  it("Si je mets une url relative, alors il retourne l'url relative, avec la bonne locale (FR)", () => {
    const normalized = normalizeUrl({
      locale: "fr",
      url: "/blog/",
    })

    expect(normalized).toEqual("/fr/blog/")
  })

  it("Si je mets une url relative, alors il retourne l'url relative, sans la locale car c'est en EN", () => {
    const normalized = normalizeUrl({
      locale: "en",
      url: "/blog/",
    })

    expect(normalized).toEqual("/blog/")
  })

  it("Si je mets une url https, alors il doit retourner l'url avec la bonne locale (ko)", () => {
    const normalized = normalizeUrl({
      locale: "ko",
      url: "https://www.google.com",
    })

    expect(normalized).toEqual("https://www.google.com/ko/")
  })

  it("Si l'utilisateur m'envoie un URL qui n'est pas valide, ça doit crash", () => {
    const normalized = () =>
      normalizeUrl({
        locale: "ko",
        url: "bonjour",
      })
    expect(normalized).toThrow()
  })

  it("Si l'utilisateur m'envoie un URL qui est vide, ça doit crash", () => {
    const normalized = () =>
      normalizeUrl({
        locale: "ko",
        url: "",
      })

    expect(normalized).toThrow()
  })

  it("Si l'utilisateur envoie #features, on doit lui renvoyer #features", () => {
    const normalized = normalizeUrl({
      locale: "ko",
      url: "#features",
    })

    expect(normalized).toEqual("#features")
  })

  it("Si l'url contient une locale (FR), la remplacer par la nouvelle locale (KO)", () => {
    const normalized = normalizeUrl({
      locale: "ko",
      url: "/fr/indexation/",
      removeLocaleIfExists: true,
    })

    expect(normalized).toEqual("/ko/indexation/")
  })

  it("Si l'url contient une locale (PT), la remplacer par la nouvelle locale (FR)", () => {
    const normalized = normalizeUrl({
      locale: "fr",
      url: "/pt/indexation/",
      removeLocaleIfExists: true,
    })

    expect(normalized).toEqual("/fr/indexation/")
  })

  it("Si l'url contient une locale (PT), la remplacer par la nouvelle locale (EN) et donc ne pas mettre de locale", () => {
    const normalized = normalizeUrl({
      locale: "en",
      url: "/pt/indexation/",
      removeLocaleIfExists: true,
    })

    expect(normalized).toEqual("/indexation/")
  })
})
