import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import React from "react"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"

export const AnalyticsMaintenance = () => (
  <div className="mx-auto max-w-4xl py-32">
    <div className="text-center">
      <Cog8ToothIcon className="inline-block h-10 w-10 text-pink-400" />
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        <FormattedMessage id="analytics/maintenance/title" />
      </h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">
        <FormattedMessage id="analytics/maintenance/description" />
      </p>
    </div>
  </div>
)
