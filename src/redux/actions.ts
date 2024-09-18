import * as ranking from "./analytics/actions"
import * as auth from "./auth/actions"
import * as darkMode from "./dark-mode/actions"
import * as di from "./di/actions"
import * as indexation from "./indexation/actions"
import * as keywords from "./keywords/actions"
import * as lang from "./lang/actions"
import * as loader from "./loader/actions"
import * as modal from "./modal/actions"
import * as notifications from "./notifications/actions"
import * as payments from "./payments/actions"
import * as stats from "./stats/actions"
import * as websites from "./websites/actions"

export const actions = {
  stats,
  notifications,
  ranking,
  auth,
  websites,
  lang,
  indexation,
  di,
  modal,
  loader,
  darkMode,
  payments,
  keywords,
}
