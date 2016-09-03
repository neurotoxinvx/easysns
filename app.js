/*
** @author: Lin Gui
** @desc: 桂林的实现方式
** @data: 2016.09.03
*/

var http = require('http')
var parseUrl = require('url').parse
var port = process.env.PORT || 3000;

/*Controller*/
function homeController (req, res) {
  res.end('home')
}

function userController (req, res) {
  res.end('user')
}

function notFoundController (req, res) {
  res.writeHead(404)
  res.end('Not Found')
}

/*router rules*/
const rules = [
  {
  	path: '/',
  	controller: homeController
  },
  {
  	path: '/user',
  	controller: userController
  }
]

/*match router rules*/
function find (ary, match) {
  for(var i = 0; i < ary.length; i++) {
    if(match(ary[i])) return ary[i]
  }
}

/*server*/
var server = http.createServer(function(req, res){
  var urlInfo = parseUrl(req.url)

  var rule = find(rules, function(rule){
  	return rule.path == urlInfo.pathname
  })
  var controller = rule && rule.controller(req, res) || notFoundController
  controller(req, res)
})

server.listen(port)
