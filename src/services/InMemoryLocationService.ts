import { ILocationService } from "../interfaces/ILocationService"

export class InMemoryLocationService implements ILocationService {
  refresh(url: string): void {
    throw new Error("Method not implemented.")
  }
  private history: Array<{ to: string; state: any }> = []
  private baseLocation: string = "http://local.dev"
  private location: string = this.baseLocation

  navigate(to: string, state = {}) {
    this.history.push({ to, state })
    if (to.startsWith("http")) this.location = to
    else this.location = this.baseLocation + to
  }

  getHistory() {
    return [...this.history]
  }

  getFullUrl() {
    return this.location
  }

  getOrigin() {
    return this.location
  }

  getPathname() {
    return this.location.replace("http://local.dev", "")
  }

  push(url: string): void {
    return this.navigate(url)
  }

  back() {
    this.history = this.history.slice(-1)
  }
}
