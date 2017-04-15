import React from 'react'

export default class App extends React.Component {
  render() {
    return React.Children.only(this.props.children)
  }
}
