const { Client } = require('pg')
const http = require('node:http');
const https = require('node:https');
const http2 = require('node:http2');
const fs = require('node:fs');

const { CONNECTION_STRING: connectionString, TLS_PATH: tlsPath, HTTP_VERSION: httpVersion, PORT: port = 8080 } = process.env;
const hostname = '0.0.0.0';

function listener(request, response) {
    client.query('SELECT NOW() as now', (err, res) => {
        if (err) {
            console.log(err.stack);
            response.statusCode = 500;
        } else {
            const value = res.rows[0].now.toString();
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end(value);
        }
    });
}

function createServer() {
    if (!!tlsPath) {
        const options = {
            pfx: fs.readFileSync(tlsPath)
        }
        return httpVersion === '2' ? http2.createSecureServer(options, listener) : https.createServer(options, listener);
    }

    return http.createServer(listener);
}

const client = new Client({
    connectionString
});

client.connect();

const server = createServer();

server.listen(port, hostname, () => {
    console.log(`Server listening on port ${port}`);
});