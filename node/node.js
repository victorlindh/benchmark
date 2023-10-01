const port = process.env.PORT
require('http')
  .createServer((req, res) => {
    res.end('Hello World!')
  })
  .listen(port, () => console.log(`node server listening on port: ${port}`))
