const port = process.env.PORT || 3000
const filename = 'code.jquery.com_jquery-3.7.1.min.js'

require('http')
  .createServer(function (req, res) {
    require('fs').readFile(filename, function (err, data) {
      if (err) {
        res.statusCode = 500
        res.end(`Error getting the file: ${err}.`)
      } else {
        res.setHeader('Content-type', 'text/javascript')
        res.end(data)
      }
    })
  })
  .listen(parseInt(port))

console.log(`node file-server listening on port: ${port}`)
