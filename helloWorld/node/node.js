const port = process.env.PORT || 3000
require('http')
  .createServer((req, res) => {
    res.end('Hello World!')
  })
  .listen(port, () => console.log(`node server listening on port: ${port}`))
