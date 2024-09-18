import React from "react"

import {
  connector,
  ContainerProps,
} from "./containers/IndexationReportPage.containers"

import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { HelperBlock } from "../../general/HelperBlock/HelperBlock"
import { WebsiteStatsIndexationReportTimeSeries } from "../WebsiteStatsIndexationReportTimeSeries/WebsiteStatsIndexationReportTimeSeries"

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
        <WebsiteStatsIndexationReportTimeSeries />

        {/* <div className="mt-2"></div>
        <IndexationReportStats />

        <div className="mt-2"></div>
        <IndexationReportPages /> */}
      </>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationReportPage = connector(Container)
