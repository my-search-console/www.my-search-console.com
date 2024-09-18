import { Switch } from "@headlessui/react"
import classNames from "classnames"
import React from "react"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"

export const PricingSwitchBillingInterval: React.FC<{
  enabled: boolean
  setEnabled: () => void
}> = (props) => {
  return (
    <div className="flex w-full justify-center rounded-3xl border border-slate-200 bg-white p-4">
      <Switch.Group as="div" className="flex items-center">
        <Switch
          checked={props.enabled}
          onChange={props.setEnabled}
          className={classNames(
            props.enabled ? "bg-pink-400" : "bg-slate-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              props.enabled ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
        <Switch.Label
          as="span"
          className="ml-3 font-display text-sm font-medium text-slate-900"
        >
          <FormattedMessage id="marketing/pricing/yearly/select/label" />
        </Switch.Label>
      </Switch.Group>
    </div>
  )
}
