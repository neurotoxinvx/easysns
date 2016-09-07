var http = require('http')
var controllers = require('./controllers')
var parseUrl = require('url').parse
var port = process.env.PORT || 8080;

function notFoundController (req, res) {
  res.writeHead(404)
  res.end('Not Found')
}

/*router rules*/
const rules = [
  {
  	path: '/',
  	controller: controllers.home
  },
  {
  	path: '/user',
  	controller: controllers.user
  },
  {
    path: /^\/static(\/.*)/,
    controller: controllers.static
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
    if(rule.path instanceof RegExp){
      var matchResult = urlInfo.pathname.match(rule.path)
      if(matchResult){
        req.params = matchResult  
      }
      return matchResult
    }
  	return rule.path == urlInfo.pathname
  })
  var controller = rule && rule.controller || notFoundController
  controller(req, res)
})

server.listen(port)
