import clsx from "clsx"
import React from "react"
import { AnalyticsCalendarModal } from "../../analytics/AnalyticsCalendarModal/AnalyticsCalendarModal"
import { Container } from "../../ui/Container"
import { Chart } from "../Chart/Chart"
import { FilterBar } from "../FilterBar/FilterBar"
import { LeaderboardShowMyDataButton } from "../LeaderboardShowMyDataButton/LeaderboardShowMyDataButton"
import { LeaderboardWebsites } from "../LeaderboardWebsites/LeaderboardWebsites"
import { SpreadFetchOnMount } from "../SpreadFetchOnMount/SpreadFetchOnMount"

const SpreadPage: React.FC = () => {
  return (
    <Container>
      <div className={clsx("py-2 relative")}>
        <FilterBar />

        <div className="mt-2" />
        <Chart />
        <div className="mt-2" />
        <LeaderboardWebsites />
        <LeaderboardShowMyDataButton />
      </div>

      <SpreadFetchOnMount />
      <AnalyticsCalendarModal />
    </Container>
  )
}

export default SpreadPage
