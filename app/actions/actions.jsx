const axios = require('axios');

export var startGetEvents = () => {
  return {
    type: 'START_GET_EVENTS'
  }
};

export var completeGetEvents = (data) => {
  var eventArray = [];
  Object.keys(data).forEach((event) => {
    eventArray.push(data[event]);
  });
  return {
    type: 'COMPLETE_GET_EVENTS',
    data: eventArray
  }
};

export var getEvents = () => {
    return (dispatch, getState) => {
      dispatch(startGetEvents());
        axios.get('http://thawing-escarpment-66044.herokuapp.com/fights').then(function (data) {
          dispatch(completeGetEvents(data.data));
        });
    };
  };

export var startGetFights = () => {
  return {
    type: 'START_GET_FIGHTS'
  }
};

export var completeGetFights = (data) => {
  return {
    type: 'COMPLETE_GET_FIGHTS',
    data
  }
};

export var getFights = (id) => {
  return (dispatch, getState) => {
    dispatch(startGetFights());

      axios.get(`http://thawing-escarpment-66044.herokuapp.com/fights/${id}`).then(function (data) {
        dispatch(completeGetFights(data.data));
      });


  }
};
