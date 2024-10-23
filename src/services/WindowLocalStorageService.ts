import { ILocalStorageService } from "../interfaces/ILocalStorageService"

export class WindowLocalStorageService implements ILocalStorageService {
  store(key: string, value: string | null) {
    try {
      if (value === null) return
      window.localStorage.setItem(key, value)
    } catch (e) {
      return null
    }
  }
  get(key: string) {
    try {
      return window.localStorage.getItem(key) || null
    } catch (e) {
      return null
    }
  }
  remove(key: string) {
    try {
      window.localStorage.removeItem(key)
    } catch (e) {}
  }
}
