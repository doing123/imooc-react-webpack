const axios = require('axios')
const querystring = require('query-string')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function(req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  console.log('proxy.js,user', user)
  const needAccessToken = req.query.needAccessToken

  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET') ? user.accesstoken : ''
  })
  if (query.needAccessToken) delete query.needAccessToken

  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    // {'accesstoken': 'xxx'} 经 querystring.stringify 处理后 'accesstoken=xxx'
    data: querystring.stringify(Object.assign({}, req.body, { // 放在body中了
      accesstoken : (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: {
      // x-www-form-urlencoded: jQuery的Ajax请求的默认方式，浏览器都支持，请求发送过程中会对数据进行序列化处理，以键值对形式的方式发送到
      //    服务器，原生Ajax就需要自己进行数据序列化处理
      // application/json: json格式的字符串，服务器端会对进行json字符串解析
      // multipart/form-data: 它会将表单的数据处理为一条消息，以标签为单元，用分隔符分开。
      //    既可以上传键值对，也可以上传文件。当上传的字段是文件时，会有Content-Type来说明文件类型；
      //    content-disposition，用来说明字段的一些信息
      // row: 可以上传任意格式的文本，可以上传text、json、xml、html等
      // binary: 相当于Content-Type:application/octet-stream,从字面意思得知，只可以上传二进制数据，通常用来上传文件，由于没有键值，所以，一次只能上传一个文件。
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(resp => {
    console.log('resp', resp)
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    console.log('proxy.js err', err)
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
