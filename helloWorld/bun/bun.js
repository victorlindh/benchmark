const port = Bun.env.PORT || 3000
Bun.serve({
  port: port,
  fetch(req) {
    return new Response('Hello World!')
  }
})
console.log(`bun server listening on port: ${port}`)
