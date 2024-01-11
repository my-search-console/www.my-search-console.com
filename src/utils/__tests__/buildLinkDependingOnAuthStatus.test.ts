import { buildLinkDependingOnAuthStatus } from "../buildLinkDependingOnAuthStatus"

describe("buildLinkDependingOnAuthStatus test suite", () => {
  it("Si authentifié + websiteId, doit renvoyer sur /indexation/websiteId", () => {
    const res = buildLinkDependingOnAuthStatus({
      isAuth: true,
      website: "www.sudoku.academy",
      tool: "indexation",
    })
    expect(res).toEqual("/indexation/www.sudoku.academy")
  })

  it("Si authentifié et sans websiteId, doit renvoyer sur /administration?tool=indexation", () => {
    const res = buildLinkDependingOnAuthStatus({
      isAuth: true,
      website: null,
      tool: "indexation",
    })
    expect(res).toEqual("/administration?tool=indexation")
  })

  it("Si authentifié avec websiteId et tool = analytics, doit renvoyer sur /analytics/websiteId", () => {
    const res = buildLinkDependingOnAuthStatus({
      isAuth: true,
      website: "www.sudoku.academy",
      tool: "analytics",
    })
    expect(res).toEqual("/analytics/www.sudoku.academy")
  })

  it("Si authentifié sans websiteId et tool = home, doit renvoyer sur /administration?tool=analytics", () => {
    const res = buildLinkDependingOnAuthStatus({
      isAuth: true,
      website: null,
      tool: "home",
    })
    expect(res).toEqual("/administration?tool=analytics")
  })

  it("Si pas authentifié + websiteId et tool = home, doit renvoyer sur /", () => {
    const res = buildLinkDependingOnAuthStatus({
      isAuth: false,
      website: "www.sudoku.academy",
      tool: "home",
    })
    expect(res).toEqual("/")
  })

  it("Si pas authentifié sans websiteId et tool = indexation, doit renvoyer sur /indexation", () => {
    const res = buildLinkDependingOnAuthStatus({
      isAuth: false,
      website: null,
      tool: "indexation",
    })
    expect(res).toEqual("/indexation")
  })

  it("Si pas authentifié sans websiteId et tool = analytics, doit renvoyer sur /analytics", () => {
    const res = buildLinkDependingOnAuthStatus({
      isAuth: false,
      website: null,
      tool: "analytics",
    })
    expect(res).toEqual("/analytics")
  })
})
