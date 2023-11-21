Deno.serve(
  {
    port: 3000
  },
  (req) => {
    return new Response('Hello World!')
  }
)
