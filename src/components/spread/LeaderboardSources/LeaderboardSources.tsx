import React from "react"
import {
  connector,
  ContainerProps,
} from "./containers/LeaderboardSources.container"

import clsx from "clsx"
import _ from "lodash"
import { useIntl } from "react-intl"
import {
  bigNumberFormatter,
  universalFormatNumber,
} from "../../../utils/bigNumberFormatter"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Tooltip } from "../../ui/Tooltip"
import { LeaderboardCard } from "../LeaderboardCard/LeaderboardCard"

type Props = ContainerProps

const Wrapper: React.FC<Props> = (props) => {
  const { locale } = useIntl()

  return (
    <LeaderboardCard
      title={<FormattedMessage id="leaderboard/sources/title" />}
      description={<FormattedMessage id="leaderboard/sources/description" />}
      fetching={props.fetching}
    >
      <div className="relative w-full">
        {_.map(props.sources, ({ clicks, impressions, activated }, index) => (
          <div
            key={index}
            className={clsx(
              "flex items-center justify-between bg-slate-50/50 px-4 py-3 font-display sm:py-3",
              index !== "google" && "mt-4"
            )}
          >
            <div className="flex items-center">
              <div className="font-display">
                <div className="text-xs font-semibold uppercase text-slate-400">
                  <FormattedMessage id="leaderboard/source" />
                </div>
                <div className="break-words capitalize text-slate-900 sm:text-lg">
                  {index}
                </div>
                {!activated && (
                  <div
                    onClick={() =>
                      props.onAuthenticate(index as "bing" | "yandex")
                    }
                    className="text-xs underline cursor-pointer text-amber-500"
                  >
                    <FormattedMessage id="leaderboard/sources/connect" />
                  </div>
                )}
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

export const LeaderboardSources = connector(Container)
