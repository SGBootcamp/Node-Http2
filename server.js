const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const utils = require('./utils');

const { HTTP2_HEADER_PATH } = http2.constants;

const server = http2.createSecureServer({
    cert: fs.readFileSync(path.join(__dirname, '/server.crt')),
    key: fs.readFileSync(path.join(__dirname, '/key.pem'))
});

function push(stream, path) {
    const file = utils.getFile(path);
    if (!file) {
        return;
    }
    stream.pushStream({[HTTP2_HEADER_PATH]: path}, (pushStream) => {
        pushStream.respondWithFD(file.content, file.headers)
    });
}

server.on('stream', (stream, headers) => {

    push(stream, '/assets/main.js');
    push(stream, '/assets/style.css');

    const file = utils.getFile('/index.html');

    // Serve file
    stream.respondWithFD(file.content, file.headers);
});

server.listen(3000);