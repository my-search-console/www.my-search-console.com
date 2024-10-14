import { ILocalStorageService } from "../interfaces/ILocalStorageService"

export class InMemoryLocalStorageService implements ILocalStorageService {
  private data: Map<string, string> = new Map()

  store(key: string, value: string) {
    this.data.set(key, value)
  }

  get(key: string) {
    return this.data.get(key) || null
  }

  remove(key: string) {
    this.data.delete(key)
  }
}
