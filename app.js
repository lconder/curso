const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const port = process.env.PORT || 9001;
const http = require('http');
const server = http.createServer(app);

app.use(bodyParser.json({ limit: '4mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '4mb' }));

app.use(cookieParser());
app.use(logger('dev'));

app.use('/docs', express.static(__dirname + '/public/docs'));

require('./startup/routes')(app);
require('./startup/db')();

server.listen(port, () => {
    console.log(` server listening on port ${port}`)
});