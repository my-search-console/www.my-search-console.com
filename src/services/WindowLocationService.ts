import { navigate } from "@reach/router"
import { ILocationService } from "../interfaces/ILocationService"

export class WindowLocationService implements ILocationService {
  navigate(to: string, state = {}) {
    navigate(to, {
      state,
    })
  }

  getFullUrl() {
    return window.location.href
  }

  getOrigin() {
    return window.location.origin
  }

  getPathname() {
    return window.location.pathname
  }

  push(to: string) {
    return navigate(to)
  }

  back() {
    return navigate(-1)
  }

  refresh(url: string) {
    window.location.href = url
  }
}
