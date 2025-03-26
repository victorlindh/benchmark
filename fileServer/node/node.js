require('http')
  .createServer(function (req, res) {
    require('fs').readFile('jquery.js', function (err, data) {
      if (err) {
        res.statusCode = 500
        res.end(`Error getting the file: ${err}.`)
      } else {
        res.setHeader('Content-type', 'text/javascript')
        res.end(data)
      }
    })
  })
  .listen(parseInt(3000))
