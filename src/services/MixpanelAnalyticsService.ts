import mixpanel from "mixpanel-browser"
import { AnalyticsEntity } from "../entities/AnalyticsEntity"
import { IAnalyticsService } from "../interfaces/IAnalyticsService"
import {
  MIXPANEL_DEVELOPMENT_API_KEY,
  MIXPANEL_HOST,
  MIXPANEL_PRODUCTION_API_KEY,
} from "../constants/mixpanel"

const API_KEY =
  process.env.NODE_ENV === "production"
    ? MIXPANEL_PRODUCTION_API_KEY
    : MIXPANEL_DEVELOPMENT_API_KEY

export class MixpanelAnalyticsService implements IAnalyticsService {
  private initialised = false

  private init() {
    try {
      if (!this.initialised) {
        mixpanel.init(API_KEY, {
          api_host: MIXPANEL_HOST,
          debug: process.env.NODE_ENV === "production" ? false : true,
          track_pageview: true,
          persistence: "localStorage",
        })
        this.initialised = true
      }
    } catch (e) {}
  }

  send(analytics: AnalyticsEntity) {
    this.init()

    const { category, action, data } = analytics

    try {
      mixpanel.track(`${category}/${action}`, data || {})
    } catch (e) {}
  }

  async authenticate(params: { id: string; created_at: Date }): Promise<void> {
    this.init()

    try {
      mixpanel.identify(params.id)
      mixpanel.people.set({ created_at: params.created_at })
    } catch (e) {}
  }

  async logout(): Promise<void> {
    try {
      mixpanel.reset()
    } catch (e) {}
  }
}
