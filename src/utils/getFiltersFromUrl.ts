import dayjs from "dayjs"

export const getFiltersFromUrl = (params: { url: string }) => {
  try {
    const filter = new URL(params.url)
    const source = filter.searchParams.get("source")
    const query = filter.searchParams.get("query")
    const country = filter.searchParams.get("country")
    const device = filter.searchParams.get("device")
    const page = filter.searchParams.get("page")
    const period = filter.searchParams.get("period")
    const orderBy = filter.searchParams.get("orderBy") as
      | "clicks"
      | "impressions"
      | "position"
      | "click_through_rate"

    const from =
      filter.searchParams.get("from") ||
      dayjs()
        .subtract(2 + 30, "days")
        .format("YYYY-MM-DD")

    const to =
      filter.searchParams.get("to") ||
      dayjs().subtract(2, "days").format("YYYY-MM-DD")

    const commonFilters = {
      source,
      query,
      country,
      device,
      page,
      orderBy,
      from,
      to,
    }

    if (period === "day" && from) {
      return {
        ...commonFilters,
        from: dayjs(from).format("YYYY-MM-DD"),
        to: dayjs(from).format("YYYY-MM-DD"),
      }
    }

    if (period === "7d") {
      return {
        ...commonFilters,
        from: dayjs(from).format("YYYY-MM-DD"),
        to: dayjs(from).add(7, "days").format("YYYY-MM-DD"),
      }
    }

    if (period === "year") {
      return {
        ...commonFilters,
        from: dayjs(from).subtract(1, "year").format("YYYY-MM-DD"),
        to: dayjs(to).format("YYYY-MM-DD"),
      }
    }

    if (period === "30d") {
      const from =
        filter.searchParams.get("from") || dayjs().subtract(32, "days")

      return {
        ...commonFilters,
        from: dayjs(from).format("YYYY-MM-DD"),
        to: dayjs(from).add(30, "days").format("YYYY-MM-DD"),
      }
    }

    if (period === "month") {
      const from =
        filter.searchParams.get("from") || dayjs().subtract(2, "days")

      return {
        ...commonFilters,
        from: dayjs(from).startOf("month").format("YYYY-MM-DD"),
        to: dayjs(from).endOf("month").format("YYYY-MM-DD"),
      }
    }

    return commonFilters
  } catch (e) {
    return {
      country: null,
      device: null,
      orderBy: null,
      query: null,
      page: null,
      source: null,
      from: dayjs().subtract(11, "days").format("YYYY-MM-DD"),
      to: dayjs().subtract(2, "days").format("YYYY-MM-DD"),
    }
  }
}
