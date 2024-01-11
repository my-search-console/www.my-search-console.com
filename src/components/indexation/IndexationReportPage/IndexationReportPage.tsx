import React from "react"

import { IndexationReportStats } from "./components/IndexationReportStats/IndexationReportStats"
import { IndexationReportPages } from "./components/IndexationReportPages/IndexationReportPages"
import {
  ContainerProps,
  connector,
} from "./containers/IndexationReportPage.containers"

import { IndexationReportChart } from "./components/IndexationReportChart/IndexationReportChart"
import { IndexationReportNonPremium } from "./components/IndexationReportNonPremium/IndexationReportNonPremium"
import { HelperBlock } from "../../general/HelperBlock/HelperBlock"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"

export const Wrapper: React.FC<{ isPremium: boolean }> = (props) => {
  return (
    <div className="min-h-screen">
      <div className="mt-2"></div>
      <HelperBlock
        title={<FormattedMessage id="indexation/reports/help/title" />}
        description={
          <FormattedMessage id="indexation/reports/help/description" />
        }
      />

      <>
        <div className="mt-2"></div>
        <IndexationReportChart />

        <div className="mt-2"></div>
        <IndexationReportStats />

        <div className="mt-2"></div>
        <IndexationReportPages />
      </>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationReportPage = connector(Container)
