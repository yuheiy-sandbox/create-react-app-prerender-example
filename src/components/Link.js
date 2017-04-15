import React from 'react'
import history from '../history'

const isLeftClickEvent = (event) => event.button === 0

const isModifiedEvent = (event) => Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

export default class Link extends React.Component {
  render() {
    const handleClick = (event) => {
      if (this.props.onClick) {
        this.props.onClick(event)
      }

      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return
      }

      if (event.defaultPrevented === true) {
        return
      }

      event.preventDefault()
      history.push(this.props.to)
    }

    const {to, children, ...props} = this.props
    return <a href={to} {...props} onClick={handleClick}>{children}</a>
  }
}
