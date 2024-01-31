import { uniqWith } from "ramda"
import {
  IRoastRepository,
  FetchRoastResponse,
  RoastRoastResponse,
  RoastRefreshResponse,
} from "../interfaces/IRoastRepository"

import { RoastWithReportEntity } from "../entities/RoastEntity"
import { ErrorEntity } from "@my-search-console/interfaces"

export class InMemoryRoastRepository implements IRoastRepository {
  private websites: RoastWithReportEntity[] = []
  private fetchResponse: FetchRoastResponse | null = null

  async store(website: RoastWithReportEntity) {
    this.websites = uniqWith<RoastWithReportEntity, RoastWithReportEntity>(
      (a, b) => a.id === b.id
    )([...this.websites, website])

    return website
  }

  __setFetchResponse(response: FetchRoastResponse) {
    this.fetchResponse = response
  }

  async fetchWebsites(): Promise<FetchRoastResponse> {
    if (this.fetchResponse) return this.fetchResponse

    return {
      error: false,
      body: {
        websites: this.websites,
      },
    }
  }

  private $roast: RoastRoastResponse | null = null

  __roast(response: RoastRoastResponse) {
    this.$roast = response
  }

  async roast(): Promise<RoastRoastResponse> {
    if (this.$roast) return this.$roast

    return {
      error: false,
      body: {
        websites: this.websites,
      },
    }
  }

  private $refresh: RoastRefreshResponse | null = null

  __refresh(response: RoastRefreshResponse) {
    this.$refresh = response
  }

  async refresh(params: { websiteId: string }): Promise<RoastRefreshResponse> {
    if (this.$refresh) return this.$refresh

    const website = this.websites.find(({ id }) => id === params.websiteId)

    if (!website)
      return {
        error: true,
        code: ErrorEntity.WEBSITE_NOT_FOUND,
      }

    return {
      error: false,
      body: {
        website,
      },
    }
  }
}
