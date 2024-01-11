export function buildLinkDependingOnAuthStatus(params: {
  isAuth: boolean
  website: string | null
  feature: "shared" | string | null
  tool:
    | "home"
    | "indexation"
    | "analytics"
    | "settings"
    | "keywords"
    | "opportunities"
    | "dashboard"
}) {
  if (!params.isAuth) {
    if (params.tool === "home") {
      return "/"
    }
    return `/${params.tool}/`
  }

  if (params.feature === "shared") {
    if (params.tool === "home") {
      return `/administration/tool=analytics`
    }
    return `/administration?tool=${params.tool}`
  }

  if (params.tool === "dashboard") {
    return "/dashboard/"
  }

  if (params.website) {
    if (params.tool === "home") {
      return `/indexation/${params.website}`
    }
    return `/${params.tool}/${params.website}`
  }

  if (params.tool === "home") {
    return "/administration?tool=indexation"
  }

  return `/administration?tool=${params.tool}`
}
