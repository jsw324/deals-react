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
  'headers': {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGY2NTE3Y2E5M2I4YjRhOGNkYmMzYmQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkyNTM5NjY2fQ.MRmk__TTTN3smPYwghpchlr6pfwC3VLUFuH0zJyJuWA'}
};

export var postContract = (data) => {
  return (dispatch, getState) => {
    dispatch(startPostContract());
    axios.post('https://shielded-inlet-46414.herokuapp.com/contractDeal', {
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
      _creator: '58f669d5017e400011465218'
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
  'headers': {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGY2NTE3Y2E5M2I4YjRhOGNkYmMzYmQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkyNTM5NjY2fQ.MRmk__TTTN3smPYwghpchlr6pfwC3VLUFuH0zJyJuWA'}
};

export var postPerm = (data) => {
  return (dispatch, getState) => {
    console.log('getstate from actions', store.getState());
    dispatch(startPostPerm());
    axios.post('https://shielded-inlet-46414.herokuapp.com/permDeal', {
      name: data.name,
      client: data.client,
      recruiter: data.recruiter,
      salary: data.salary,
      sales: data.sales,
      fee: data.fee,
      startDate: data.startDate,
      isActive: 'true',
      _creator: '58f669d5017e400011465218'
    }, config).then((data) => {
      console.log('data from axios action', data);
      dispatch(completePostPerm(data));
    });
  };
};

//////////////////////////////////
//----GET PERM DEALS-------///
//////////////////////////////////

export var startGetPerm = () => {
  return {
    type: 'START_GET_PERM'
  }
};

export var completeGetPerm = (data) => {
  return {
    type: 'COMPLETE_GET_PERM',
    data: data.data
  }
};

var config = {
  'headers': {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGY2NTE3Y2E5M2I4YjRhOGNkYmMzYmQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkyNTM5NjY2fQ.MRmk__TTTN3smPYwghpchlr6pfwC3VLUFuH0zJyJuWA'}
};

export var getPerm = (data) => {
  return (dispatch, getState) => {
    dispatch(startGetPerm());
    axios.get('https://shielded-inlet-46414.herokuapp.com/getPermDeals', config).then((data) => {
      console.log('data from axios action', data);
      dispatch(completeGetPerm(data));
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
    axios.post('https://shielded-inlet-46414.herokuapp.com/users/login', {
      email,
      password
    }).then(function(data) {
      console.log('logged in', data.data);
      dispatch(completeLogin(data.data));
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
    axios.post('https://shielded-inlet-46414.herokuapp.com/users', {
      email,
      password,
      isAdmin: 'false'
    }).then(function(data) {
      console.log('user data', data);
      dispatch(completePostSignUp(data));
    });
  };
};


