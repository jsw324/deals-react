const axios = require('axios');

export var startPostDeal = () => {
  return {
    type: 'START_POST_DEAL'
  }
};

export var completePostDeal = (data) => {
  return {
    type: 'COMPLETE_POST_DEAL',
    data
  }
};

var config = {
  'headers': {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGU5MGFjMTlmMjIyMTVkYmQxMmQ4ZGYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkxNzczMTA0fQ.R-qx2woxQghIseZ6WDoXRUd6ugWAq_VNOP8B-rkk_EI'}
};

export var postDeal = (data) => {
  return (dispatch, getState) => {
    dispatch(startPostDeal());
    axios.post('http://localhost:4000/deals', {
      name: data.name,
      client: data.client,
      isPerm: 'false',
      recruiter: data.recruiter,
      salary: 0,
      sales: data.sales,
      payRate: data.hourly,
      billRate: data.billRate,
      startDate: data.startDate,
      isActive: 'true',
      _creator: 123
    }, config).then((data) => {
      console.log('data from axios action', data);
      dispatch(completePostDeal(data));
    });
  };
};

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
    }).then(function(data) {
      console.log('logged in', data);
      console.log('logged in headers', data.headers);
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


