export interface ILocalStorageEmailRepository {
  store(email: string): Promise<void>
  get(): Promise<string | null>
}
