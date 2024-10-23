import { AnalyticsEntity } from "../entities/AnalyticsEntity"
import { IAnalyticsService } from "../interfaces/IAnalyticsService"

export class InMemoryAnalyticsService implements IAnalyticsService {
  private analytics: AnalyticsEntity[] = []
  private user: string | null = null

  send(analytics: AnalyticsEntity) {
    this.analytics.push(analytics)
  }

  getAllAnalytics() {
    return this.analytics
  }

  isAuthenticated() {
    return Boolean(this.user)
  }

  async authenticate(params: { id: string }): Promise<void> {
    this.user = params.id
  }

  async logout(): Promise<void> {
    this.user = null
  }
}
