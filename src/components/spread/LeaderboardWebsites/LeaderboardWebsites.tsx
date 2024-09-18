import React from "react"
import {
  connector,
  ContainerProps,
} from "./containers/LeaderboardWebsites.container"

import clsx from "clsx"
import { useIntl } from "react-intl"
import {
  bigNumberFormatter,
  universalFormatNumber,
} from "../../../utils/bigNumberFormatter"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Tooltip } from "../../UI/Tooltip"
import { LeaderboardCard } from "../LeaderboardCard/LeaderboardCard"

type Props = ContainerProps

const Wrapper: React.FC<Props> = (props) => {
  const { locale } = useIntl()

  return (
    <LeaderboardCard
      title={<FormattedMessage id="leaderboard/websites/title" />}
      description={<FormattedMessage id="leaderboard/websites/description" />}
      fetching={props.fetching}
    >
      <div className="relative w-full h-96 no-scroll-bar overflow-y-auto">
        {props.websites.map(({ id, clicks, impressions }, index) => (
          <div
            key={index}
            className={clsx(
              "flex items-center justify-between bg-slate-50/50 px-4 py-3 font-display sm:py-3",
              index !== 0 && "mt-4"
            )}
          >
            <div className="flex items-center">
              <div className="font-display">
                <div className="text-xs font-semibold uppercase text-slate-400">
                  <FormattedMessage id="leaderboard/domain" />
                </div>
                <div className="break-words text-slate-900 sm:text-lg">
                  {id}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <Tooltip
                  direction="left"
                  align="left"
                  label={
                    <p className="text-base font-medium">
                      {universalFormatNumber({ num: clicks, locale })}
                    </p>
                  }
                >
                  <div className="text-right font-display">
                    <div className="text-xs font-semibold uppercase text-slate-400">
                      <FormattedMessage id="leaderboard/clicks" />
                    </div>

                    <div className="text-sm font-semibold text-pink-400 sm:text-base">
                      {bigNumberFormatter(clicks, 0)}
                    </div>
                  </div>
                </Tooltip>
              </div>
              <div>
                <Tooltip
                  direction="left"
                  align="left"
                  label={
                    <p className="text-base font-medium">
                      {universalFormatNumber({ num: impressions, locale })}
                    </p>
                  }
                >
                  <div className="text-right font-display">
                    <div className="text-xs font-semibold uppercase text-slate-400">
                      <FormattedMessage id="leaderboard/impressions" />
                    </div>

                    <div className="text-sm font-semibold text-indigo-400 sm:text-base">
                      {bigNumberFormatter(impressions, 0)}
                    </div>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
    </LeaderboardCard>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const LeaderboardWebsites = connector(Container)
