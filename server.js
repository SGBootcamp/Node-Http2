const http2 = require('http2');
const fs = require('fs');
const path = require('path');

const server = http2.createSecureServer({
    cert: fs.readFileSync(path.join(__dirname, '/server.crt')),
    key: fs.readFileSync(path.join(__dirname, '/key.pem'))
});

server.on('stream', (stream, headers) => {
    stream.respond({
        'content-type': 'text/html',
        ':status': 200
    });

    stream.end('<h1>Hello World</h1>');
});

server.listen(3000);