import * as http from 'http';
import * as debug from 'debug';
import App from "./app";
const opts = require("opts");

const options = [
    {
        short: 'p',
        long: 'port',
        description: 'Port to bind app',
        value: true,
        require: false
    },
    {
        short: 's',
        long: 'secure-port',
        description: 'Secure port to bind app (Default: 8443)',
        value: true,
        require: false
    },
    {
        long: 'exclude-http',
        description: 'Exclude binding to http',
        require: false
    },
    {
        long: 'exclude-https',
        description: 'Exclude binding to https',
        require: false
    },
    {
        short: 'r',
        description: 'Required tsnode for compiling ts files',
        require: false
    },
    {
        long: 'env',
        description: 'Required tsnode for compiling ts files',
        require: false
    },
];

opts.parse(options, true);

//Default ports
const listenport = opts.get('port') || 80, slistenport = opts.get('secure-port') || 443;

let httpServer, httpsServer;
  // Bind app to listenport
  if (!opts.get('exclude-http')) {
      const http = require('http');
      httpServer = http.createServer(App);

      httpServer.listen(listenport, () => console.log(`App running on port: ${listenport}`));
  }

  // Create https server and pass it app
if (!opts.get('exclude-https')) {

    const fs = require('fs'), https = require('https'),
    privateKey = fs.readFileSync('ssl/private.key', 'utf8'),
    certificate = fs.readFileSync('ssl/server.crt', 'utf8'),
    credentials = { key: privateKey, cert: certificate };

    httpsServer = https.createServer(credentials, App);

    httpsServer.listen(slistenport, () => console.log(`App running https on port: ${slistenport}`));

}

module.exports = {App, httpServer, httpsServer};
