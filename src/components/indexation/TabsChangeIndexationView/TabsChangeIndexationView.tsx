import classNames from "classnames"
import React from "react"
import { ITranslations } from "../../../interfaces/ITranslations"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import {
  connector,
  ContainerProps,
} from "./containers/TabsChangeIndexationView.containers"

const tabs: Array<{
  name: ITranslations["keys"]
  id: "indexation" | "report" | "auto"
}> = [
  { name: "indexation/tabs/manual", id: "indexation" },
  { name: "indexation/tabs/queue", id: "auto" },
  // { name: "indexation/tabs/report", id: "report" },
]

export const Wrapper: React.FC<{
  onChange(view: "indexation" | "auto" | "report"): void
  view: "indexation" | "report" | "auto"
}> = (props) => {
  return (
    <div className="mt-2">
      <div className="relative font-display sm:hidden">
        <select
          name="select-view"
          className="block w-full rounded-md border-slate-200 text-sm focus:border-pink-400 focus:ring-pink-400"
          defaultValue={props.view}
          onChange={(e) => props.onChange(e.target.value as any)}
        >
          {tabs.map((tab) => (
            <option value={tab.id} key={tab.id}>
              <FormattedMessage id={tab.name} />
            </option>
          ))}
        </select>
      </div>

      <div className="hidden overflow-hidden rounded-md border border-slate-100 sm:block">
        <div className="">
          <nav className="flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <div
                onClick={() => props.onChange(tab.id)}
                key={tab.id}
                className={classNames(
                  tab.id === props.view
                    ? "border-pink-400 text-pink-400"
                    : "border-transparent text-slate-400 hover:border-pink-400 hover:text-pink-400",
                  "w-1/2 cursor-pointer border-b-2 px-1 py-4 text-center font-display text-sm font-medium transition-all duration-300 ease-in-out"
                )}
              >
                <FormattedMessage id={tab.name} />
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const TabsChangeIndexationView = connector(Container)
