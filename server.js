const http2 = require('http2');
const fs = require('fs');
const path = require('path');

const server = http2.createSecureServer({
    cert: fs.readFileSync(path.join(__dirname, '/server.crt')),
    key: fs.readFileSync(path.join(__dirname, '/key.pem'))
});

server.listen(3000);