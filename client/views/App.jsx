import React from 'react'
import Routes from '../config/router'

import AppBar from './layout/app-bar'

// export default () => (
//   <div>this is test </div>
// )

export default class App extends React.Component {
  componentDidMount() {
    // todo
  }

  render() {
    return [
      <AppBar />,
      <Routes />,
    ]
  }
}
