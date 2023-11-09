const port = Deno.env.get('PORT') || 3000
Deno.serve(
  {
    port: port,
    onListen() {
      console.log(`deno server listening on port: ${port}`)
    }
  },
  (_req) => {
    return new Response('Hello World!')
  }
)
