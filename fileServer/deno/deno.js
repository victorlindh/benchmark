Deno.serve(
  {
    port: 3000
  },
  async (_req) => {
    let file
    try {
      const file = await Deno.open('jquery.js')
      return new Response(file.readable)
      /*
      file = await Deno.readTextFile('jquery.js', { read: true })
      return new Response(file, {
        headers: {
          'content-type': 'text/javascript'
        }
      })
      */
    } catch (e) {
      return new Response('404 Not Found', { status: 404 })
    }
  }
)
