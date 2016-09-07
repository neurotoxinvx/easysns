const fs = require('fs')
const joinPath = require('path').join
const publicPath = joinPath(__dirname, '../public')

module.exports = function (req, res) {
  var path = req.params[1]
  path = joinPath(publicPath, path)
  fs.readFile(path, function(err, data){
    res.end(data);
  })
}