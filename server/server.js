const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const serverRender = require('./util/server-render')
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(bodyParser.json()) // json数据转为 req body 上的数据
app.use(bodyParser.urlencoded({ extended: false })) // form data数据转化为 req body 上的数据

app.use(session({
  cookie: {
    maxAge: 10 * 60 * 1000
  },
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'get cnode api'
}))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

if (!isDev) {
    const serverEntry = require('../dist/server-entry')
    const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8')
    app.use('/public', express.static(path.join(__dirname, '../dist')))

    app.get('*', function(req, res, next) {
      serverRender(serverEntry, template, req, res).catch(next)
    })
} else {
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

// 处理 next 抛出的错误
app.use(function(error, req, res, next) {
  console.log(error)
  res.status(500).send(error)
})

app.listen(3000, function() {
    console.log('server is listening on 3000')
})
