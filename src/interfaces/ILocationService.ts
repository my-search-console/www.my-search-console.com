export interface ILocationService {
  navigate(to: string, state?: any): any
  getFullUrl(): string
  getOrigin(): string
  getPathname(): string
  push(url: string): void
  back(): void
}
