import dayjs from "dayjs"
import { moveDate } from "../moveDateFromUrl"

describe("moveDate test suite", () => {
  beforeEach(() => {
    const mockedDate = new Date("2021-07-01")

    jest.useFakeTimers()
    jest.setSystemTime(mockedDate)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe("PAST", () => {
    const direction = "past"

    it("Si l'URL contient aucun filtre, on récupère from/to de la semaine passée jusqu'à aujourd'hui - 11 jours", () => {
      const url = "https://www.foudroyer.com/analytics/www.sudoku.com"

      const { from, to } = moveDate({ url, direction })

      expect(from).toEqual(dayjs().subtract(18, "days").format("YYYY-MM-DD"))
      expect(to).toEqual(dayjs().subtract(11, "days").format("YYYY-MM-DD"))
    })

    it("Si l'URL contient period 7d, from et to, on prend la period en compte et on recule depuis from", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?period=7d&from=2021-03-01&to=2021-04-07"

      const { from, to } = moveDate({ url, direction })

      expect(from).toEqual("2021-02-22")
      expect(to).toEqual("2021-03-01")
    })

    it("Si l'URL contient period 30d, from et to, on prend la period en compte et on recule depuis from", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?period=30d&from=2021-02-03&to=2021-04-07"

      const { from, to } = moveDate({ url, direction })

      expect(to).toEqual("2021-02-03")
      expect(from).toEqual("2021-01-04")
    })

    it("Si l'URL contient period 30d, on récupère from/to du mois passé jusqu'à aujourd'hui - 34 jours", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?period=30d"

      const { from, to } = moveDate({ url, direction })

      expect({ from, to }).toEqual({ from: "2021-04-28", to: "2021-05-28" })
    })

    it("Si l'URL contient period month, on récupère from/to du mois précédent", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?period=month"

      const { from, to } = moveDate({ url, direction, period: "month" })

      expect(from).toEqual("2021-05-01")
      expect(to).toEqual("2021-05-31")
    })

    it("Si l'URL contient from/to sans period, prend la distance entre les deux et on recule de cette distance", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?from=2021-02-25&to=2021-02-30"

      const { from, to } = moveDate({ url, direction })

      expect(from).toEqual("2021-02-20")
      expect(to).toEqual("2021-02-25")
    })

    it("Je veux pouvoir bouger de 1 seul jour", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?from=2021-02-25&to=2021-02-25"

      expect(moveDate({ url, direction: "future" })).toEqual({
        from: "2021-02-26",
        to: "2021-02-26",
      })

      expect(moveDate({ url, direction: "past" })).toEqual({
        from: "2021-02-24",
        to: "2021-02-24",
      })

      expect(
        moveDate({
          url: "https://www.foudroyer.com/analytics/www.sudoku.com?from=2021-07-01&to=2021-07-01",
          direction: "future",
        })
      ).toEqual({
        from: "2021-06-26",
        to: "2021-06-27",
      })
    })
  })

  describe("FUTURE", () => {
    const direction = "future"

    it("Si l'URL contient aucun filtre, on récupère from/to de la semaine passée jusqu'à aujourd'hui - 11 jours", () => {
      const url = "https://www.foudroyer.com/analytics/www.sudoku.com"

      const { from, to } = moveDate({ url, direction })

      expect(from).toEqual("2021-06-20")
      expect(to).toEqual("2021-06-27")
    })

    it("Si l'URL contient period 7d, from et to, on prend la period en compte et on avance depuis to", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?period=7d&from=2021-03-01&to=2021-04-07"

      const { from, to } = moveDate({ url, direction })

      expect(from).toEqual("2021-03-08")
      expect(to).toEqual("2021-03-15")
    })

    it("Si l'URL contient period 30d, from et to, on prend la period en compte et on avance depuis to", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?period=30d&from=2021-02-03&to=2021-04-07"

      const { from, to } = moveDate({ url, direction })

      expect(from).toEqual("2021-03-05")
      expect(to).toEqual("2021-04-04")
    })

    it("Si l'URL contient period month et from, on prend le mois et on avance au suivant", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?period=month&from=2021-02-15"

      const { from, to } = moveDate({ url, direction, period: "month" })

      expect(from).toEqual("2021-03-01")
      expect(to).toEqual("2021-03-31")
    })

    it("Si l'URL contient period month, la date actuelle est retournée", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?period=month"

      const { from, to } = moveDate({ url, direction, period: "month" })

      expect(from).toEqual("2021-06-01")
      expect(to).toEqual("2021-06-27")
    })

    it("Si l'URL contient from/to sans period, prend la distance entre les deux et on avance de cette distance", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?from=2021-02-10&to=2021-02-15"

      const { from, to } = moveDate({ url, direction })

      expect(from).toEqual("2021-02-15")
      expect(to).toEqual("2021-02-20")
    })

    it("Si period est month et que la date est ce mois-ci, alors la date actuelle est retournée", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?period=month&date=2021-07-02"

      const { from, to } = moveDate({ url, direction, period: "month" })

      expect(from).toEqual("2021-06-01")
      expect(to).toEqual("2021-06-27")
    })

    it("Si TO est après aujourd'hui, on met le meme intervalle mais avec TO à aujourd'hui", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?from=2021-05-15&to=2021-06-15"

      const { from, to } = moveDate({ url, direction })

      expect(from).toEqual("2021-05-27")
      expect(to).toEqual("2021-06-27")
    })

    it("Si j'ai period 30d et que j'appuie sur suivant, alors j'ai FROM d'il y a 30 jours - 4 et TO d'aujourd'hui - 4", () => {
      const url =
        "https://www.foudroyer.com/analytics/www.sudoku.com?period=30d"

      const { from, to } = moveDate({ url, direction })

      expect(from).toEqual("2021-05-28")
      expect(to).toEqual("2021-06-27")
    })

    it("Si j'ai period 7d et que j'appuie sur suivant, alors j'ai FROM d'il y a 7 jours - 4 et TO d'aujourd'hui - 4", () => {
      const url = "https://www.foudroyer.com/analytics/www.sudoku.com?period=7d"

      const { from, to } = moveDate({ url, direction })

      expect(from).toEqual("2021-06-20")
      expect(to).toEqual("2021-06-27")
    })
  })

  describe("debug", () => {
    beforeEach(() => {
      const mockedDate = new Date("2023-08-10")

      jest.useFakeTimers()
      jest.setSystemTime(mockedDate)
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it("/analytics/www.sudoku.academy?period=month&from=2023-03-01&to=2023-03-31", () => {
      const url =
        "https://www.test.com/analytics/www.sudoku.academy?period=month&from=2023-03-01&to=2023-03-31"

      const { from, to } = moveDate({
        url,
        direction: "future",
        period: "month",
      })

      expect(from).toEqual("2023-04-01")
      expect(to).toEqual("2023-04-30")
    })
  })
})
