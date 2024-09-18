import { IndexationType } from "@foudroyer/interfaces"
import { BoltIcon } from "@heroicons/react/20/solid"
import React from "react"
import { useIntl } from "react-intl"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/AdvancedFilterPanel.container"

type Props = {
  onClose: () => void
  onSave: () => void
  onReset: () => void
  onIndexAll: () => void
  length: number
  indexationState: IndexationType | null
  showIndexedPages: boolean
  onChangeShowIndexedPages: (value: boolean) => void
  searchValue: string | null
  onChangeSearchValue: (value: string) => void
  onChangeSort: (value: "desc" | "asc") => void
  from: Date | null
  onChangeFrom: (value: Date | null) => void
  to: Date | null
  onChangeTo: (value: Date | null) => void
  searchRule: "contains" | "not-contains" | "ends_with" | "starts_with"
  onChangeSearchRule: (
    value: "contains" | "not-contains" | "ends_with" | "starts_with"
  ) => void
  onChangeIndexationState: (value: IndexationType | null) => void
  fetching: boolean
}

const Wrapper: React.FC<Props> = (props) => {
  const intl = useIntl()

  return (
    <div className="relative mt-2 overflow-hidden rounded-md   bg-slate-50 px-6">
      <div className="py-5">
        <h3 className="font-display text-sm font-medium">
          <FormattedMessage id="indexation/filter-panel/title" />
        </h3>
        <p className="text-sm text-slate-500">
          <FormattedMessage id="indexation/filter-panel/description" />
        </p>
      </div>
      <div className="border-t border-slate-200 py-5 sm:p-0">
        <dl className="divide-y divide-slate-100">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="font-display text-sm font-medium">
              <FormattedMessage id="indexation/filter-panel/url/title" />
            </dt>
            <dd className="mt-1 grid grid-cols-2 text-slate-900 sm:col-span-2 sm:mt-0">
              <div className="pr-2">
                <label
                  htmlFor="search_rule"
                  className="font-display text-sm font-medium"
                >
                  <FormattedMessage id="indexation/filter-panel/url/rules/label" />
                </label>
                <select
                  id="search_rule"
                  name="search_rule"
                  className="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-blue-300 focus:outline-none focus:ring-blue-300"
                  value={props.searchRule}
                  onChange={(e) =>
                    props.onChangeSearchRule(
                      e.target.value as
                        | "contains"
                        | "not-contains"
                        | "ends_with"
                        | "starts_with"
                    )
                  }
                >
                  <option value="contains">
                    <FormattedMessage id="indexation/filter-panel/url/rules/contains" />
                  </option>
                  <option value="not-contains">
                    <FormattedMessage id="indexation/filter-panel/url/rules/not-contains" />
                  </option>
                  <option value="ends_with">
                    <FormattedMessage id="indexation/filter-panel/url/rules/ends_with" />
                  </option>
                  <option value="starts_with">
                    <FormattedMessage id="indexation/filter-panel/url/rules/starts_with" />
                  </option>
                </select>
              </div>
              <div className="pl-2">
                <label
                  htmlFor="search"
                  className="font-display text-sm font-medium"
                >
                  <FormattedMessage id="indexation/filter-panel/url/rules/value/label" />
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border-slate-300 text-base"
                  id="search"
                  name="search"
                  placeholder={intl.formatMessage({
                    id: "indexation/filter-panel/url/rules/value/label",
                  })}
                  onChange={(e) => {
                    props.onChangeSearchValue(e.target.value as string)
                  }}
                  value={props.searchValue || ""}
                />
              </div>
            </dd>
          </div>

          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="font-display text-sm font-medium">
              <FormattedMessage id="indexation/filter-panel/save/title" />
            </dt>
            <dd className="mt-1 flex flex-wrap items-center justify-between space-x-2  sm:col-span-2 sm:mt-0">
              <ButtonSecondary onClick={props.onSave}>
                <FormattedMessage id="indexation/filter-panel/save/buttons/filter" />
              </ButtonSecondary>

              <ButtonPrimary
                disabled={props.fetching}
                onClick={props.onIndexAll}
              >
                <BoltIcon className="mr-2 h-4 w-4" />
                <FormattedMessage
                  id="indexation/filter-panel/save/buttons/index"
                  values={{
                    d: props.length,
                  }}
                />
              </ButtonPrimary>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) =>
  props.show ? <Wrapper {...props} /> : <></>

export const AdvancedFilterPanel = connector(Container)
