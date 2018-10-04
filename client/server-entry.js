import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'

import { JssProvider } from 'react-jss'
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles'

import App from './views/App'

import { createStoreMap } from './store/store'

// Create a new class name generator.
const generateClassName = createGenerateClassName()

// 让 mobx 在服务端渲染的时候不会重复数据变换
useStaticRendering(true)

// 多个store {appStore: xxx}
export default (stores, routerContext, sheetsRegistry, jss, theme, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName} jss={jss}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
