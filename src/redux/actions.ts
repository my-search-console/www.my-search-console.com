import * as analytics from "./analytics/actions"
import * as auth from "./auth/actions"
import * as di from "./di/actions"
import * as lang from "./lang/actions"
import * as loader from "./loader/actions"
import * as modal from "./modal/actions"
import * as notifications from "./notifications/actions"
import * as spread from "./spread/actions"
import * as websites from "./websites/actions"

export const actions = {
  spread,
  notifications,
  analytics,
  auth,
  websites,
  lang,
  di,
  modal,
  loader,
}
