import {
  IndexationStateFetchResponse,
  IStatsRepository,
  WebsiteIndexationStateFetchResponse,
} from "../interfaces/IStatsRepository"

export class InMemoryStatsRepository implements IStatsRepository {
  IndexationWebsiteStateFetch(params: {
    websiteId: string
  }): Promise<WebsiteIndexationStateFetchResponse> {
    throw new Error("Method not implemented.")
  }
  IndexationStateFetch(): Promise<IndexationStateFetchResponse> {
    throw new Error("Method not implemented.")
  }
}
