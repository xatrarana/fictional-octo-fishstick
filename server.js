const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require('fs');
const path = require('path')
 
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
   
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
 

      // serve the custom staic route
      if (pathname.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, 'public', pathname);
        fs.stat(filePath, (err) => {
          if (err) {
            res.statusCode = 404;
            res.end('Not Found');
          } else {
            fs.createReadStream(filePath).pipe(res);
          }
        });
        return;
      }

        // handle the next.js routes
      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})