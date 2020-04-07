require('rootpath')();
const express = require('express');
const app = express();
const httpServer = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('src/_helpers/jwt');
const errorHandler = require('src/_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(jwt());

app.use('/users', require('./users/users.controller'));

app.use(errorHandler);

const requestListener = function(req, res) {
    res.writeHead(200);
    res.end("Hello World")
}

const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
// const server = httpServer.createServer(requestListener)
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});