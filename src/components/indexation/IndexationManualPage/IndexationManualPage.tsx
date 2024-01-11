import React from "react"
import { IndexationStats } from "../IndexationStats/IndexationStats"
import { AllPages } from "../IndexedTable/IndexedTable"
import { Pagination } from "../Pagination/Pagination"
import { RefreshSitemapAndIndexation } from "../RefreshSitemapAndIndexation/RefreshSitemapAndIndexation"
import { SourceSelector } from "../../analytics/FilterBar/components/SourceSelector/SourceSelector"
import { AdvancedFilterPanel } from "../AdvancedFilterPanel/AdvancedFilterPanel"
import { IndexationReportChart } from "../IndexationReportPage/components/IndexationReportChart/IndexationReportChart"
import { IndexationToastUpsell } from "../IndexationToastUpsell/IndexationToastUpsell"
import { IndexationStatsBar } from "../IndexationStatsBar/IndexationStatsBar"
import { FilterAndSearchActionBar } from "../FilterAndSearchActionBar/FilterAndSearchActionBar"

export const IndexationManualPage = () => (
  <div className="min-h-screen">
    <div className="mt-2"></div>
    <IndexationToastUpsell />

    <div className="mt-2"></div>
    <RefreshSitemapAndIndexation />

    <div className="mt-2"></div>
    <IndexationStatsBar />

    <div className="mt-2"></div>
    <FilterAndSearchActionBar />

    <div className="mt-2"></div>
    <AllPages />
    <Pagination />
  </div>
)
