import { getWebsiteIdFromUrl } from "../getWebsiteIdFromUrl"

describe("getWebsiteIdFromUrl test suite", () => {
  it("Si l'URL contient un websiteId, et une feature, alors ça retourne websiteId = websiteId et feature = feature", () => {
    const res = getWebsiteIdFromUrl("/indexation/www.sudoku.academy")
    expect(res).toEqual({
      websiteId: "www.sudoku.academy",
      feature: "indexation",
    })
  })

  it("Si l'URL ne contient pas de websiteId, mais une feature, alors ça retourne websiteId = null et feature = feature", () => {
    const res = getWebsiteIdFromUrl("/indexation")
    expect(res).toEqual({
      websiteId: null,
      feature: "indexation",
    })
  })

  it("Si l'URL ne contient pas de websiteId, mais une (autre) feature, alors ça retourne websiteId = null et feature = feature", () => {
    const res = getWebsiteIdFromUrl("/analytics")
    expect(res).toEqual({
      websiteId: null,
      feature: "analytics",
    })
  })

  it("Si l'URL ne contient pas de websiteId, et une feature non existante, alors ça retourne websiteId = null et feature = feature", () => {
    const res = getWebsiteIdFromUrl("/lol")
    expect(res).toEqual({
      websiteId: null,
      feature: null,
    })
  })

  it("Si l'URL contient un websiteId, et une feature, alors ça retourne websiteId = null et feature = feature", () => {
    const res = getWebsiteIdFromUrl("/analytics/www.sudoku.academy")
    expect(res).toEqual({
      websiteId: "www.sudoku.academy",
      feature: "analytics",
    })
  })

  it("Si l'URL contient un websiteId, et une feature, alors ça retourne websiteId = null et feature = feature", () => {
    const res = getWebsiteIdFromUrl("/analytics/www.sudoku.academy/params")
    expect(res).toEqual({
      websiteId: "www.sudoku.academy",
      feature: "analytics",
    })
  })

  it("Si l'URL est absolu et contient un websiteId, et une feature, alors ça retourne websiteId = websiteId et feature = feature", () => {
    const res = getWebsiteIdFromUrl(
      "https://google.com/analytics/www.sudoku.academy/params"
    )
    expect(res).toEqual({
      websiteId: "www.sudoku.academy",
      feature: "analytics",
    })
  })

  it("Si l'URL est absolu et ne contient pas de websiteId ni feature, alors ça retourne websiteId = null et feature = null", () => {
    const res = getWebsiteIdFromUrl("https://google.com/")
    expect(res).toEqual({
      websiteId: null,
      feature: null,
    })
  })

  it("Si l'URL est absolu et ne contient pas de websiteId, avec feature = indexation, alors ça retourne websiteId = null et feature = feature", () => {
    const res = getWebsiteIdFromUrl("https://google.com/indexation")
    expect(res).toEqual({
      websiteId: null,
      feature: "indexation",
    })
  })

  it("Si l'URL est absolu et ne contient pas de websiteId ni feature, alors ça retourne websiteId = null et feature = null", () => {
    const res = getWebsiteIdFromUrl("https://google.com/lol")
    expect(res).toEqual({
      websiteId: null,
      feature: null,
    })
  })

  it("Si l'URL est absolu, contient un websiteId et feature ET une langue, alors ça retourne websiteId = websiteId et feature = feature", () => {
    const res = getWebsiteIdFromUrl(
      "https://google.com/fr/analytics/www.sudoku.academy/"
    )
    expect(res).toEqual({
      websiteId: "www.sudoku.academy",
      feature: "analytics",
    })
  })

  it("Si l'URL est absolu, contient PAS de websiteId mais une feature et une langue, alors ça retourne websiteId = null et feature = feature", () => {
    const res = getWebsiteIdFromUrl("https://google.com/fr/analytics/")
    expect(res).toEqual({
      websiteId: null,
      feature: "analytics",
    })
  })

  it("Si l'URL est relatif, contient un websiteId et feature ET une langue, alors ça retourne websiteId = websiteId et feature = feature", () => {
    const res = getWebsiteIdFromUrl("/fr/analytics/www.sudoku.academy/")
    expect(res).toEqual({
      websiteId: "www.sudoku.academy",
      feature: "analytics",
    })
  })
})
