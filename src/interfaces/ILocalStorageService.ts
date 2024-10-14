import { localStorageKeys } from "../constants/localStorageKeys"

export interface ILocalStorageService {
  store(key: localStorageKeys, value: string | null): void
  get(key: localStorageKeys): string | null
  remove(key: localStorageKeys): void
}
