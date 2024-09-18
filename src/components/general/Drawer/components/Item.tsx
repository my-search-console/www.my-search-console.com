import React, { ReactElement } from "react"
import { FoudroyerLink } from "../../FoudroyerLink/FoudroyerLink"

type Props = {
  to: string
  title: string | ReactElement
  icon: ReactElement
  target?: "_self" | "_blank"
}

const containerStyle =
  "flex items-center p-3 py-4 -m-3 space-x-4 transition duration-150 ease-in-out rounded cursor-pointer hover:bg-slate-100"
const iconStyle = `flex-shrink-0 flex items-center text-slate-800`
const textStyle = "text-base font-medium leading-6 text-center text-slate-800"

export const Item: React.FC<Props> = (props) => (
  <FoudroyerLink
    to={props.to}
    target={props.target || "_self"}
    className={containerStyle}
  >
    <div className={iconStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        {props.icon}
      </svg>
    </div>
    <div className={textStyle}>{props.title}</div>
  </FoudroyerLink>
)

type ClickableProps = {
  onClick: Function
  title: string | ReactElement
  icon: ReactElement
}

export const Clickable: React.FC<ClickableProps> = (props) => (
  <div onClick={() => props.onClick()} className={containerStyle}>
    <div className={iconStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        {props.icon}
      </svg>
    </div>
    <div className={textStyle}>{props.title}</div>
  </div>
)
