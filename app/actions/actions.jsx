import firebase, { firebaseRef, googleProvider } from 'app/firebase/';
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

export var postContract = (data) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var contractRef = firebaseRef.child(`users/contract/${uid}`).push(data);

    return contractRef.then(() => {
      dispatch(completePostContract({
        ...data,
        id: contractRef.key
      }));
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
    var uid = getState().auth.uid;
    var permRef = firebaseRef.child(`users/perm/${uid}`).push(data);

    return permRef.then(() => {
      dispatch(completePostPerm({
        ...data,
        id: permRef.key
      }));
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
    data: data
  }
};

//firebase getPerm

export var getPerm = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var permRef = firebaseRef.child(`users/perm/${uid}`)
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
    data: data
  }
};

export var getContract = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var contractRef = firebaseRef.child(`users/contract/${uid}`)
    dispatch(startGetContract());
    return contractRef.once('value').then((snapshot) => {
      var contractDeals = snapshot.val() || {};
      var parsedDeals = [];
  
      Object.keys(contractDeals).forEach((deal) => {
        parsedDeals.push({
          id: deal,
          ...contractDeals[deal]
        });
      });
      console.log('parsed deals', parsedDeals);
      dispatch(completeGetContract(parsedDeals));
    })
  }
}


//////////////////////////////////
//----USER ACTIONS-------///
//////////////////////////////////

export var login = (user) => {
  return {
    type: 'LOGIN',
    uid: user.uid,
    photo: user.photoURL,
    name: user.displayName,
    isAdmin: user.isAdmin
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(googleProvider).then((result) => {
      if (result.user.displayName === 'Jason Walkow') {
        result.user.isAdmin = true;
      }
      console.log('Auth worked', result.user);
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


