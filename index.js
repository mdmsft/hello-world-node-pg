const { Client } = require('pg')
const http = require('http');

const connectionString = process.env.CONNECTION_STRING;
const hostname = '0.0.0.0';
const port = 8080;

const client = new Client({
    connectionString
});

client.connect();

const server = http.createServer((request, response) => {
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
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});