//const cookies = require('../utils/cookies')
const send = require('../utils/send')
const models = require('../models')
const joinPath = require('path').join
const multiparty = require('multiparty')
//const authorize = require('../middlewares/authorize')

// function getLoginUserId(req, callback){
//   var c = cookies.parse(req.headers.cookie || console.log('c', c))
//   console.log('c', c)
//   if (!c.token) {
//   	return callback()
//   }
//   models.token.get(c.token, callback)
// }

exports.user = function (req, res) {
  // getLoginUserId(req, function(err, userId){
  // 	if (err) {
  // 	  return send.sendError(err, res)
  // 	}
  // 	console.log('userId', userId)
  // 	models.user.get(userId, function(err, user){
  // 	  if (err) {
  // 	  	return send.sendError(err, res)
  // 	  }
  // 	  res.end(JSON.stringify(user))
  // 	})
  // })
  
  models.user.get(req.userId, function(err, user){
     if (err) {
       return send.sendError(err, res)
     }
     res.end(JSON.stringify(user))
   })
}

const uploadDir = joinPath(__dirname, '../data/upload')

exports.myavatar = function(req, res){
  if (!req.userId) {
    return send.sendError(new Error('not_login'), res)
  }
  // 初始化
  var form = new multiparty.Form({
    uploadDir: uploadDir
  })
  // 解析 multipart request
  form.parse(req, function(err, fields, files){
    if (err) {
      return send.sendError(err, res)
    }
    console.log('files', files)
    var newPath = files.file[0].path.replace(uploadDir, '')
    console.log('newPath', newPath)
    var url = 'http://localhost:8080/upload' + newPath
    models.user.updatePart(req.userId, {avatar: url}, function(err, info){
      if (err) {
        send.sendError(err, res)
      }
      res.end(JSON.stringify({
        avatar: url
      }))
    })
  })
}