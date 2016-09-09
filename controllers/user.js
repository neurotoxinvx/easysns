//const cookies = require('../utils/cookies')
const send = require('../utils/send')
const models = require('../models')
const authorize = require('../middlewares/authorize')

// function getLoginUserId(req, callback){
//   var c = cookies.parse(req.headers.cookie || console.log('c', c))
//   console.log('c', c)
//   if (!c.token) {
//   	return callback()
//   }
//   models.token.get(c.token, callback)
// }

module.exports = authorize(function (req, res) {
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
})