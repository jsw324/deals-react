import firebase, { firebaseRef, googleProvider } from 'app/firebase/';
const moment = require('moment');


//////////////////////////////////
//----MODAL-------///
//////////////////////////////////

export var togglePermModal = () => {
  return {
    type: 'TOGGLE_PERM_MODAL'
  }
}

export var toggleContractModal = () => {
  return {
    type: 'TOGGLE_CONTRACT_MODAL'
  }
}

//////////////////////////////////
//---- POST CONTRACT DEALS-------///
//////////////////////////////////

export var completePostContract = (data) => {
  return {
    type: 'COMPLETE_POST_CONTRACT',
    data
  }
};

export var postContract = (data) => {
  console.log('CONTRACT DATA', data);
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
//---- POST PERM DEALS-------///
//////////////////////////////////

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
//----POST/GET EMPLOYEES-------///
//////////////////////////////////

export var postRecruiter = (data) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    data.userId = uid;
    var recruiterRef = firebaseRef.child(`/recruiters`).push(data);

    return recruiterRef.then(() => {
      dispatch(completePostRecruiter({
        ...data,
        id: recruiterRef.key
      }));
    });
  };
};

export var completePostRecruiter = (data) => {
  return {
    type: 'COMPLETE_POST_RECRUITER',
    data
  }
};

export var getRecruiters = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var recruiterRef = firebaseRef.child(`/recruiters`);
    return recruiterRef.once('value').then((snapshot) => {
      var rawRecruiters = snapshot.val() || {};
      var recruiters = [];
      Object.keys(rawRecruiters).forEach((recruiter) => {
        recruiters.push({
          id: recruiter,
          ...rawRecruiters[recruiter]
        })
      });
      console.log('recruiters', recruiters);
      dispatch(completeGetRecruiters(recruiters));
    })
  }
}

export var completeGetRecruiters = (data) => {
  return {
    type: 'COMPLETE_GET_RECRUITERS',
    data: data
  }
};

//////////////////////////////////
//----GET PERM DEALS-------///
//////////////////////////////////

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

// TESTING: Get ALL perm deals as admin...TODO: need to authenticate whether user is admin

export var adminPerm = () => { 
  return (dispatch, getState) => {
    var permRef = firebaseRef.child('users/perm/');
    return permRef.once('value').then((snapshot) => {
      var permDeals = snapshot.val() || {};
    });
  }
}


//////////////////////////////////
//--- GET CONTRACT DEALS -------///
//////////////////////////////////

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
    return contractRef.once('value').then((snapshot) => {
      var contractDeals = snapshot.val() || {};
      var parsedDeals = [];
      Object.keys(contractDeals).forEach((deal) => {
        parsedDeals.push({
          id: deal,
          ...contractDeals[deal]
          
        });
      });
      dispatch(completeGetContract(parsedDeals));
    })
  }
}

export var endContract = (contractors) => {
  return (dispatch, getState) => {
    console.log("ACTION", contractors);
    var uid = getState().auth.uid;
    firebaseRef.child(`users/contract/${uid}/${contractors.id}`).set({
      ...contractors
    })
    dispatch(getContract());
  };
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

export var startLoginWithEmailAndPassword = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
    //handle success
    console.log('worked', result);
  }).catch((error) => {
    //handle error
    console.log('error', error);
  });
}

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


