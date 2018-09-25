const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1' // https 写成 http 导致请求失败

router.post('/login', function(req, res, next) {
  console.log('handle-login.js, req.body', req.body)
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accesstoken
  })
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        console.log('resp.data', resp.data)
        req.session.user = {
          accessToken: req.body.accesstoken,
          loginName: resp.data.loginName,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        }
        console.log(req.session.user)
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      console.log('err', err)
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data // err.response 嵌套太多，太大
        })
      } else {
        next(err)
      }
    })
})


module.exports = router
