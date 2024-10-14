import React, { ReactElement } from "react"
import { v4 } from "uuid"

export class UniqueIdWidget extends React.Component<{
  onChange: (value: string) => void
  forID: string
  value: ReactElement
  classNameWrapper: string
}> {
  static defaultProps = {
    value: "",
  }

  componentDidMount() {
    const { value, onChange } = this.props

    if (!value) {
      onChange(v4())
    }
  }

  render() {
    const styles = {
      color: "#b9bcc1",
      backgroundColor: "#efefef",
    }

    const { value, classNameWrapper, forID } = this.props

    return (
      <span id={forID} className={classNameWrapper} style={styles}>
        {value}
      </span>
    )
  }
}
