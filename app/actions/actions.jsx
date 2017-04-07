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
        var event = data.data;
        var fighters = [];
        event.forEach((val) => {
          // axios.get(`http://localhost:3500/fighter/${val.fighter1_first_name}${val.fighter1_last_name}`).then(function(data) {
          //    console.log('association', data.data.name, data.data.association);
          // }).catch((e) => {
          //   console.log('error', e);
          // });
          // axios.get(`http://localhost:3500/fighter/${val.fighter2_first_name}${val.fighter2_last_name}`).then(function(data) {
          //   if (data) {
          //     console.log('fighter2', data.data.name, data.data.association);
          //   } else {
          //     console.log('error retrieveing fighter association');
          //   }
          // });
          fighters.push({
            fighter1: val.fighter1_first_name + ' ' + val.fighter1_last_name,
            fighter2: val.fighter2_first_name + ' ' + val.fighter2_last_name,
            fighter1_image: val.fighter1_full_body_image,
            fighter2_image: val.fighter2_full_body_image,
            weightClass: val.fighter1_weight_class,
            fighter1record: val.fighter1record,
            fighter2record: val.fighter2record,
            fighter1height: val.fighter1height,
            fighter2height: val.fighter2height,
            fighter1weight: val.fighter1weight,
            fighter2weight: val.fighter2weight
          });
        });
   
        dispatch(completeGetFights(data.data));
      });


  }
};


