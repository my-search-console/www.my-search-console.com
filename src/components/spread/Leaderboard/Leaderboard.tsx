import React, { useEffect } from "react"
import { connector, ContainerProps } from "./containers/Leaderboard.container"

import clsx from "clsx"
import { useIntl } from "react-intl"
import {
  bigNumberFormatter,
  universalFormatNumber,
} from "../../../utils/bigNumberFormatter"
import { Avatar } from "../../general/Avatar/Avatar"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Tooltip } from "../../ui/Tooltip"
import { LeaderboardCard } from "../LeaderboardCard/LeaderboardCard"

type Props = ContainerProps

const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  const { locale } = useIntl()

  return (
    <LeaderboardCard
      title={<FormattedMessage id="leaderboard/users/title" />}
      description={<FormattedMessage id="leaderboard/users/description" />}
      fetching={props.isFetching}
    >
      <div className="relative w-full h-96 no-scroll-bar overflow-y-auto">
        {props.ladder.map(({ username, yearly_visits, pfk_user_id }, index) => (
          <div
            key={index}
            className={clsx(
              "flex items-center justify-between mb-4 px-4 py-3 font-display sm:py-3",
              pfk_user_id === props.userId
                ? "sticky bottom-4 bg-white border border-pink-50 mx-2 rounded-md"
                : "bg-slate-50/50"
            )}
          >
            <div className="flex items-center">
              <div className="relative">
                <Avatar size={48} name={username} />

                <div className="absolute -bottom-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white font-display text-xs">
                  {index + 1}
                </div>
              </div>
              <div className="ml-4 font-display">
                <div className="text-xs font-semibold uppercase text-slate-400">
                  <FormattedMessage id="show-off/leaderboard/username"></FormattedMessage>
                </div>
                <div className="break-words text-slate-900 sm:text-lg">
                  {username}
                </div>
              </div>
            </div>
            <div>
              <Tooltip
                direction="left"
                align="left"
                label={
                  <p className="text-base font-medium">
                    {universalFormatNumber({ num: yearly_visits, locale })}
                  </p>
                }
              >
                <div className="text-right font-display">
                  <div className="text-xs font-semibold uppercase text-slate-400">
                    <FormattedMessage id="show-off/leaderboard/clicks"></FormattedMessage>
                  </div>

                  <div className="text-sm font-semibold text-pink-400 sm:text-base">
                    {bigNumberFormatter(yearly_visits, 0)}
                  </div>
                </div>
              </Tooltip>
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

export const Leaderboard = connector(Container)
