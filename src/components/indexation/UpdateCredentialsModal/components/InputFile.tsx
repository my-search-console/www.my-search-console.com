import { PaperClipIcon } from "@heroicons/react/24/outline"
import React, { useState } from "react"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"

export const InputFile: React.FC<{
  onChange: (value: string) => void
}> = (props) => {
  const [file, setFile] = useState<string | null>(null)

  return (
    <div className="relative mt-2 flex flex-col justify-center rounded-lg border border-dashed border-slate-900/25 px-4 py-4 text-center text-sm">
      <PaperClipIcon
        className="mx-auto h-8 w-8 text-slate-200"
        aria-hidden="true"
      />
      <label
        htmlFor="file-upload"
        className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center rounded-md pt-4 font-semibold text-pink-400 focus-within:outline-none focus-within:ring-1 focus-within:ring-pink-600 hover:text-pink-500"
      >
        {!file && (
          <FormattedMessage id="update-credentials/input/placeholder" />
        )}

        {file && file}
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          onChange={(e) => {
            const files = e.target.files || []
            const file = files[0]

            if (!file) return false

            const reader = new FileReader()

            reader.addEventListener("load", (event) => {
              if (!event.target?.result) return false
              setFile(file.name)
              props.onChange(event.target.result.toString())
            })

            reader.readAsText(file)
          }}
        />
      </label>
      <p className="mt-6 text-xs text-slate-400">
        <FormattedMessage id="update-credentials/input/file-format" />
      </p>
    </div>
  )
}
