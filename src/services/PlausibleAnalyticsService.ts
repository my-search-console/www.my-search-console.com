import { AnalyticsEntity } from "../entities/AnalyticsEntity"
import { IAnalyticsService } from "../interfaces/IAnalyticsService"

export class PlausibleAnalyticsService implements IAnalyticsService {
  send(analytics: AnalyticsEntity) {
    const { category, action, data } = analytics

    try {
      window.plausible(`${category}/${action}`, data || {})
    } catch (e) {}
  }

  async authenticate(params: { id: string; created_at: Date }): Promise<void> {}

  async logout(): Promise<void> {}
}
