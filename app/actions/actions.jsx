const axios = require('axios');

export var startLogin = () => {
  return {
    type: 'START_LOGIN'
  }
};

export var completeLogin = (data) => {
  return {
    type: 'COMPLETE_LOGIN',
    data
  }
};

export var getLogin = (email, password) => {
  return (dispatch, getState) => {
    dispatch(startLogin());
    axios.post('http://localhost:4000/users/login', {
      email,
      password
    }). then(function(data) {
      console.log('logged in', data);
      dispatch(completeLogin(data));
    });
  };
};

export var startPostSignUp = () => {
  return {
    type: 'START_POST_SIGNUP'
  }
};

export var completePostSignUp = (data) => {
  return {
    type: 'COMPLETE_POST_SIGNUP',
    data
  }
};

export var postSignUp = (email, password) => {
  return (dispatch, getState) => {
    dispatch(startPostSignUp());
    console.log('email', email, password);
    axios.post('http://localhost:4000/users', {
      email,
      password,
      isAdmin: 'false'
    }).then(function(data) {
      console.log('user data', data);
      dispatch(completePostSignUp(data));
    });
  };
};


