const port = Bun.env.PORT || 3000
const filename = 'code.jquery.com_jquery-3.7.1.min.js'

Bun.serve({
  port: port,
  fetch(req) {
    const path = filename
    const file = Bun.file(path)
    return new Response(file)
  }
})
console.log(`bun server listening on port: ${port}`)
