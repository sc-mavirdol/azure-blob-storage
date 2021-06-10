const {createServer} = require('https');
const {parseURL} = require('whatwg-url');
const fs = require('fs');

const httpsOptions = {
  key: fs.readFileSync('./certificates/localhost.key'),
  cert: fs.readFileSync('./certificates/localhost.crt'),
};

module.exports = async (nextApp, options) => {
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  const server = createServer(httpsOptions, (req, res) => {
    const parsedUrl = parseURL(req.url);
    handle(req, res, parsedUrl);
  });

  return new Promise((resolve, reject) => {
    server.listen(options.port, (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(`> Ready on https://localhost:${options.port}`);
      return resolve();
    });
  });
};
