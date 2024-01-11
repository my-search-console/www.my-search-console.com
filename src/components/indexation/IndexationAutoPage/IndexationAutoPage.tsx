import React from "react"

import { IndexationAutoStats } from "./components/IndexationAutoStats/IndexationAutoStats"
import { IndexationAutoPages } from "./components/IndexationAutoPages/IndexationAutoPages"
import { IndexationAutoChart } from "../IndexationAutoChart/IndexationAutoChart"
import {
  ContainerProps,
  connector,
} from "./containers/IndexationAutoPage.containers"

import { IndexationAutoEmpty } from "../IndexationAutoEmpty/IndexationAutoEmpty"
import { PageHeading } from "../../general/PageHeading"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { HelperBlock } from "../../general/HelperBlock/HelperBlock"

export const Wrapper: React.FC<{ isPremium: boolean }> = (props) => {
  return (
    <div className="min-h-screen">
      <div className="mt-2"></div>

      <>
        <div className="mt-2"></div>

        <HelperBlock
          title={<FormattedMessage id="indexation/auto/help/title" />}
          description={
            <FormattedMessage id="indexation/auto/help/description" />
          }
        />

        <div className="mt-2"></div>
        <IndexationAutoChart />

        <div className="mt-2"></div>
        <IndexationAutoStats />

        <div className="mt-2"></div>
        <IndexationAutoPages />

        <div className="mt-2"></div>
        <IndexationAutoEmpty />
      </>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationAutoPage = connector(Container)
