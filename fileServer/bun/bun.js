Bun.serve({
  port: 3000,
  fetch(req) {
    const file = Bun.file('jquery.js')
    return new Response(file)
  }
})
