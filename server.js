const express = require('express');
const axios = require('axios');
const moment = require('moment');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3500;

//Create our app
var app = express();

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/fights', (req, res) => {
  var fights = [];
  axios.get('http://ufc-data-api.ufc.com/api/v3/iphone/events').then(function (data) {
    if (!data) {
      throw new Error('unable to retrieve fights');
    } else {
      var today = new Date();
      today = moment.utc(today).format();
      //console.log(today + ' ' + 'event_dategmt ' + data[i].event_dategmt);
      var obj;
      for (var key in data.data[433]) {
        var obj = data[key];
        }
        console.log('length', data.data.length);
      for (var i = 0; i < data.data.length; i++) {
        if (today <= data.data[i].event_dategmt) {
           fights.push({
             id: data.data[i].id,
             date: data.data[i].event_dategmt,
             title: data.data[i].base_title,
             title_tag: data.data[i].title_tag_line,
             img: data.data[i].feature_image
           })
         }
       }
       res.status(200).send(fights);
     }
   }).catch(function (err) {
     console.log('err in func', err);
   });
});

app.get('/fights/:id', (req, res) => {
  var id = req.params.id;
  console.log('id',id);
  axios.get(`http://ufc-data-api.ufc.com/api/v3/iphone/events/${id}/fights`)
  .then((fights) => {
    if (!fights) {
      throw new Error('Unable to retrieve event details');
    } else {
      var obj;
      for (var key in fights) {
        var obj = fights[key];
        }
      res.status(200).send(obj);
    }
  }).catch(function (err) {
    console.log('err in fights', err);
  });
});

app.listen(PORT, () => {
  console.log('Express server is up on port ' + PORT);
});
