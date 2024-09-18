import { UserIcon, XMarkIcon } from "@heroicons/react/20/solid"
import React, { useEffect } from "react"
import {
  connector,
  ContainerProps,
} from "./containers/AddUserToWebsiteList.container"

import { UserWithRoleEntity } from "@foudroyer/interfaces"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"

type Props = {
  onMount: () => void
  onDelete: (id: string) => void
  users: UserWithRoleEntity[]
}

const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  return (
    <div className="max-w-3xl">
      <ul role="list" className="mt-4 divide-y divide-slate-200">
        {props.users.map((member, index) => (
          <li
            key={member.email}
            className="flex items-center justify-between space-x-3 py-4 "
          >
            <div className="flex min-w-0 flex-1 items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10  items-center justify-center rounded-full bg-slate-50 text-slate-400">
                  <UserIcon className="h-6 w-6" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-medium  text-slate-900">
                  {member.email}
                </p>
                <p className="inline-block rounded bg-pink-50 px-2 py-0.5 font-display text-xs text-pink-400">
                  <FormattedMessage
                    id={`settings/add-user/user/role/${member.role}`}
                  />
                </p>
              </div>
            </div>

            {member.role !== "admin" && (
              <div className="flex-shrink-0">
                <button
                  onClick={() => props.onDelete(member.email)}
                  type="button"
                  className="inline-flex items-center rounded-full p-1 text-sm font-semibold leading-6 text-slate-400 transition-all duration-300 ease-in-out hover:bg-pink-50 hover:text-pink-400"
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AddUserToWebsiteList = connector(Container)
