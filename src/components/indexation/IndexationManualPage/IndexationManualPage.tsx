import React from "react"
import { AdvancedFilterPanel } from "../AdvancedFilterPanel/AdvancedFilterPanel"
import { FilterAndSearchActionBar } from "../FilterAndSearchActionBar/FilterAndSearchActionBar"
import { IndexationStatsBar } from "../IndexationStatsBar/IndexationStatsBar"
import { AllPages } from "../IndexedTable/IndexedTable"
import { Pagination } from "../Pagination/Pagination"
import { RefreshSitemapAndIndexation } from "../RefreshSitemapAndIndexation/RefreshSitemapAndIndexation"
import { WebsiteStatsIndexationReportTimeSeries } from "../WebsiteStatsIndexationReportTimeSeries/WebsiteStatsIndexationReportTimeSeries"

export const IndexationManualPage = () => (
  <div className="min-h-screen">
    <div className="mt-2"></div>

    {/* <HelperBlock
      title={<FormattedMessage id="indexation/manual/help/title" />}
      description={<FormattedMessage id="indexation/manual/help/description" />}
    /> */}

    <div className="mt-2"></div>
    <WebsiteStatsIndexationReportTimeSeries />
    <div className="mt-2"></div>
    <RefreshSitemapAndIndexation />

    <div className="mt-2"></div>
    <IndexationStatsBar />

    <div className="mt-2"></div>
    <FilterAndSearchActionBar />
    <div className="mt-2"></div>
    <AdvancedFilterPanel />

    <div className="mt-2"></div>
    <AllPages />
    <Pagination />
  </div>
)
