const axios = require('axios');
const moment = require('moment');


module.exports = {
  getFights: function() {
    var requestUrl = 'http://localhost:3500/fights';
    var fights = [];
    return axios.get(requestUrl).then(function (res) {
      if (!res) {
        throw new Error('unable to retrieve fights');
      } else {
        console.log('React Res', res.data[40].title);
        return res.data;
      }
    }, function (res) {
      throw new Error('Unable to retrieve fights');
    })
  }
}
