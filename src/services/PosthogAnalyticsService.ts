import { AnalyticsEntity } from "../entities/AnalyticsEntity"
import { IAnalyticsService } from "../interfaces/IAnalyticsService"

export class PosthogAnalyticsService implements IAnalyticsService {
  send(analytics: AnalyticsEntity) {
    const { category, action, data } = analytics

    try {
      window.posthog.capture(`${category}/${action}`, data || {})
    } catch (e) {}
  }

  async authenticate(params: { id: string; created_at: Date }): Promise<void> {
    try {
      window.posthog.identify(params.id)
    } catch (e) {}
  }

  async logout(): Promise<void> {
    try {
      window.posthog.reset(true)
    } catch (e) {}
  }
}
