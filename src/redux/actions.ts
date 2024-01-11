import * as di from "./di/actions"
import * as lang from "./lang/actions"
import * as websites from "./websites/actions"
import * as notifications from "./notifications/actions"
import * as auth from "./auth/actions"
import * as ranking from "./analytics/actions"
import * as indexation from "./indexation/actions"
import * as modal from "./modal/actions"
import * as loader from "./loader/actions"
import * as payments from "./payments/actions"
import * as darkMode from "./dark-mode/actions"
import * as keywords from "./keywords/actions"
import * as spread from "./spread/actions"
import * as opportunities from "./opportunities/actions"
import * as roast from "./roast/actions"

export const actions = {
  roast,
  spread,
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
  opportunities,
}
