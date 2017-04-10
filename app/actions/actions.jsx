const axios = require('axios');

//////////////////////////////////
//----CONTRACT DEALS-------///
//////////////////////////////////

export var startPostContract = () => {
  return {
    type: 'START_POST_CONTRACT'
  }
};

export var completePostContract = (data) => {
  return {
    type: 'COMPLETE_POST_CONTRACT',
    data
  }
};

var config = {
  'headers': {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGViOTI0NjAzZDUxN2JmYmY5NzgxMTciLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkxODQ4MjA4fQ.AB8fpW2iWm09zOb-L8L_aCf_jrUAd3TiHjhLjffq1gg'}
};

export var postContract = (data) => {
  return (dispatch, getState) => {
    dispatch(startPostContract());
    axios.post('http://localhost:4000/contractDeal', {
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
      _creator: '58eb924603d517bfbf978117'
    }, config).then((data) => {
      console.log('data from axios action', data);
      dispatch(completePostContract(data));
    });
  };
};
//////////////////////////////////
//----PERM DEALS-------///
//////////////////////////////////

export var startPostPerm = () => {
  return {
    type: 'START_POST_PERM'
  }
};

export var completePostPerm = (data) => {
  return {
    type: 'COMPLETE_POST_PERM',
    data
  }
};

var config = {
  'headers': {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGViZTYwOTAxZDJiMmY3ZGU2M2RiMzAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkxODU0ODc2fQ.TfppkHx1GXQfDVnssBgvNTggp5Ylc-QHOnMzSI05kbM'}
};

export var postPerm = (data) => {
  return (dispatch, getState) => {
    dispatch(startPostPerm());
    axios.post('http://localhost:4000/permDeal', {
      name: data.name,
      client: data.client,
      recruiter: data.recruiter,
      salary: data.salary,
      sales: data.sales,
      fee: data.fee,
      startDate: data.startDate,
      isActive: 'true',
      _creator: '58ebe60901d2b2f7de63db30'
    }, config).then((data) => {
      console.log('data from axios action', data);
      dispatch(completePostPerm(data));
    });
  };
};

//////////////////////////////////
//----USER ACTIONS-------///
//////////////////////////////////

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


