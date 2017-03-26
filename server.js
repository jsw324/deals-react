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
      for (var key in data) {
        var obj = data[key];
        }
      for (var i = 0; i < obj.length; i++) {
        if (today <= obj[i].event_dategmt) {
           fights.push({
             id: obj[i].id,
             date: obj[i].event_dategmt,
             title: obj[i].base_title,
             title_tag: obj[i].title_tag_line,
             img: obj[i].feature_image
           })
         }
       }
       console.log('fight title from server***',fights[0].title);
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
      console.log('fighter1', obj[0].fighter1_first_name);
    }
  }).catch(function (err) {
    console.log('err in fights', err);
  });
});

app.listen(PORT, () => {
  console.log('Express server is up on port ' + PORT);
});
