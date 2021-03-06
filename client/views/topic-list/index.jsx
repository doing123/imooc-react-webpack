import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button'

import AppState from '../../store/app-state'
import Container from '../layout/container'

@inject('appState') @observer
export default class TopicList extends React.Component {
  static propTypes = {
    appState: PropTypes.instanceOf(AppState).isRequired,
  }

  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {
    // do something here
  }

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { appState } = this.props
        appState.count = 3
        resolve(true)
      })
    })
  }

  changeName(event) {
    const { appState } = this.props
    appState.changeName(event.target.value)
  }

  render() {
    const { appState } = this.props
    return (
      <Container>
        <Helmet>
          <title>topic list</title>
          <meta name="description" content="description" />
        </Helmet>
        <Button variant="outlined" color="primary">click me</Button>
        <input type="text" onChange={this.changeName} />
        <br />
        <span>{appState.msg}</span>
      </Container>
    )
  }
}
