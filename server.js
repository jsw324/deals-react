const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3500;

//Create our app
var app = express();

app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use(express.static('public'));
app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log('Express server is up on port ' + PORT);
});