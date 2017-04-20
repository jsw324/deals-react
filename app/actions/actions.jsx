import firebase, { firebaseRef, googleProvider } from 'app/firebase/';
const axios = require('axios');


//////////////////////////////////
//----CONTRACT DEALS-------///
//////////////////////////////////

export var startPostContract = () => {
  return {
    type: 'START_POST_CONTRACT'
  }
};import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

export var completePostContract = (data) => {
  return {
    type: 'COMPLETE_POST_CONTRACT',
    data
  }
};

var config = {
  'headers': {'x-auth': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGY2NjlkNTAxN2U0MDAwMTE0NjUyMTgiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkyNTQzOTU3fQ.781Em7eVaYcOT0zb0C-VkQS3oad_vFL07njtwMK-9-k"}
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

//firebase add perm start 

export var postPerm = (data) => {
  return (dispatch, getState) => {
    console.log('firebase perm data', data);
    var uid = getState().auth.uid;
    var permRef = firebaseRef.child(`users/${uid}/perm`).push(data);

    return permRef.then(() => {
      dispatch(completePostPerm({
        ...data,
        id: permRef.key
      }));
    });
  };
};



// export var postPerm = (data) => {
//   return (dispatch, getState) => {
//     dispatch(startPostPerm());
//     axios.post('https://shielded-inlet-46414.herokuapp.com/permDeal', {
//       name: data.name,
//       client: data.client,
//       recruiter: data.recruiter,
//       salary: data.salary,
//       sales: data.sales,
//       fee: data.fee,
//       startDate: data.startDate,
//       isActive: 'true',
//       _creator: '58f669d5017e400011465218'
//     }, config).then((data) => {
//       console.log('data from axios action', data);
//       dispatch(completePostPerm(data));
//     });
//   };
// };

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
    data: data
  }
};

//firebase getPerm

export var getPerm = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var permRef = firebaseRef.child(`users/${uid}/perm`)
    dispatch(startGetPerm());
    return permRef.once('value').then((snapshot) => {
      var permDeals = snapshot.val() || {};
      var parsedDeals = [];

      Object.keys(permDeals).forEach((deal) => {
        parsedDeals.push({
          id: deal,
          ...permDeals[deal]
        });
      });
      dispatch(completeGetPerm(parsedDeals));
    })
  }
}


//////////////////////////////////
//----GET CONTRACT DEALS-------///
//////////////////////////////////

export var startGetContract = () => {
  return {
    type: 'START_GET_CONTRACT'
  }
};

export var completeGetContract = (data) => {
  return {
    type: 'COMPLETE_GET_CONTRACT',
    data: data.data
  }
};

export var getContract = (data) => {
  return (dispatch, getState) => {
    dispatch(startGetContract());
    axios.get('https://shielded-inlet-46414.herokuapp.com/getContractDeals', config).then((data) => {
      console.log('contractors', data);
      dispatch(completeGetContract(data));
    });
  };
};


//////////////////////////////////
//----USER ACTIONS-------///
//////////////////////////////////

export var login = (user) => {
  return {
    type: 'LOGIN',
    uid: user.uid,
    photo: user.photoURL,
    name: user.displayName
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(googleProvider).then((result) => {
      console.log('Auth worked', result);
      dispatch(login(result.user))
    }, (error) => {
      console.log('Unable to auth', error);
    });
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('Logged out');
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};


