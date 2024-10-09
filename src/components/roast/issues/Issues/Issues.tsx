import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid"
import React, { useState } from "react"
import { IssueEntity } from "../../../../entities/IssueEntity"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../../uiii/Button/Button"
import { Modal } from "../Modal/Modal"
import { connector, ContainerProps } from "./containers/Issues.container"

type Props = {
  issues: IssueEntity[]
}

const Wrapper: React.FC<Props> = (props) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [issueShowOnModal, setIssueShowOnModal] = useState<IssueEntity | null>(
    null
  )

  return (
    <>
      <Modal
        issue={issueShowOnModal}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      {props.issues.map((issue, index) => (
        <div
          key={index}
          className="mt-2 flex items-center justify-between rounded-md border border-slate-100 p-2"
        >
          <div className="ml-2 flex items-center font-display">
            {issue.status === "pass" && (
              <CheckCircleIcon className="mr-2 h-5 w-5 text-emerald-500" />
            )}
            {issue.status === "dont-pass" && (
              <XCircleIcon className="mr-2 h-5 w-5 text-red-500" />
            )}
            {issue.status === "warning" && (
              <ExclamationTriangleIcon className="mr-2 h-5 w-5 text-orange-500" />
            )}

            <FormattedMessage id={`issues/modal/error/title/${issue.name}`} />
          </div>

          {issue.status !== "pass" && (
            <ButtonSecondary
              size="sm"
              onClick={() => {
                setIssueShowOnModal(issue)
                setModalOpen(true)
              }}
            >
              <FormattedMessage id={`roast/global/how-to-fix`} />
            </ButtonSecondary>
          )}

          {issue.status === "pass" && (
            <ButtonSecondary
              size="sm"
              onClick={() => {
                setIssueShowOnModal(issue)
                setModalOpen(true)
              }}
            >
              <FormattedMessage id={`roast/global/why`} />
            </ButtonSecondary>
          )}
        </div>
      ))}
    </>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Issues = connector(Container)
