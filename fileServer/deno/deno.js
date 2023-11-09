const port = Deno.env.get('PORT') || 3000
const filename = 'code.jquery.com_jquery-3.7.1.min.js'
Deno.serve(
  {
    port: port,
    onListen() {
      console.log(`deno server listening on port: ${port}`)
    }
  },
  async (_req) => {
    const filepath = filename
    // Try opening the file
    let file
    try {
      file = await Deno.readTextFile(filepath, { read: true })
      // Build a readable stream so the file doesn't have to be fully loaded into
      // memory while we send it
      //const readableStream = file.readable
      // Build and send the response
      return new Response(file, {
        headers: {
          'content-type': 'text/javascript'
        }
      })
    } catch (e) {
      // If the file cannot be opened, return a "404 Not Found" response
      return new Response('404 Not Found', { status: 404 })
    }
  }
)
