export interface ILocationService {
  navigate(to: string, state?: { disableScroll?: boolean }): any
  getFullUrl(): string
  getOrigin(): string
  getPathname(): string
  push(url: string): void
  back(): void
  refresh(url: string): void
}
