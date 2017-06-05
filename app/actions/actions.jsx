import firebase, { firebaseRef, googleProvider } from 'app/firebase/';
const moment = require('moment');


//////////////////////////////////
//----MODALS-------///
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

export var showEndContractModal = (contractor) => {
  return {
    type: 'SHOW_END_CONTRACT_MODAL',
    modalProps: { contractor }
  }
}

export var hideEndContractModal = () => {
  return {
    type: 'HIDE_END_CONTRACT_MODAL'
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
    var contractRef = firebaseRef.child(`users/contract/`).push(data);

    return contractRef.then(() => {
      dispatch(completePostContract({
        ...data,
        id: contractRef.key
      }));
    });
  };
};

export var toggleCompletedContracts = (data) => {
  return {
    type: 'TOGGLE_COMPLETED_CONTRACTS'
  };
};

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
    var email = getState().auth.email;
    var recruiters = getState().recruiters;
    //match logged in users email to email from FB to get Id
    var userId;
    recruiters.forEach((recruiter) => {
      if (email === recruiter.email) {
        userId = recruiter.id;
        console.log('CID', userId);
      }
    });

    var contractRef = firebaseRef.child(`users/contract/`)
    return contractRef.once('value').then((snapshot) => {
      var contractDeals = snapshot.val() || {};
      var parsedDeals = [];
      Object.keys(contractDeals).forEach((deal) => {
        parsedDeals.push({
          id: deal,
          ...contractDeals[deal]
          
        });
      });
      // only push deals that belong to logged in users recruiter.Id
      var byRecruiter = [];
      parsedDeals.forEach((deal) => {
        if (userId === deal.recruiter || userId === deal.sales) {
          byRecruiter.push(deal);
        }
      });
      console.log('byR Contract', byRecruiter);
      dispatch(completeGetContract(byRecruiter));
    })
  }
}

export var endContract = (contractors) => {
  return (dispatch, getState) => {
    console.log("ACTION", contractors);
    var uid = getState().auth.uid;
    firebaseRef.child(`users/contract/${contractors.id}`).set({
      ...contractors
    })
    dispatch(getContract());
  };
}





//////////////////////////////////
//---- POST PERM DEALS-------///
//////////////////////////////////

export var completePostPerm = (data) => {
  return {
    type: 'COMPLETE_POST_PERM',
    data
  }
};

export var postPerm = (data) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var permRef = firebaseRef.child(`users/perm/`).push(data);
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

export var completeGetPerm = (data) => {
  return {
    type: 'COMPLETE_GET_PERM',
    data: data
  }
};

//firebase getPerm

export var getPerm = () => {
  return (dispatch, getState) => {
    var email = getState().auth.email;
    var recruiters = getState().recruiters;
    // match logged in users email to email from FB to get ID
    var userId;
    recruiters.forEach((recruiter) => {
      if (email === recruiter.email) {
        userId = recruiter.id;
        console.log('ID', userId);
      }
    })
    // get all Perm Deals from FB
    var permRef = firebaseRef.child(`users/perm/`)
    return permRef.once('value').then((snapshot) => {
      var permDeals = snapshot.val() || {};
      var parsedDeals = [];
      Object.keys(permDeals).forEach((deal) => {
        parsedDeals.push({
          id: deal,
          ...permDeals[deal]
        });
      });
      // only push deals that belong to logged in users recruiter.Id
      var byRecruiter = [];
      parsedDeals.forEach((deal) => {
        if (userId === deal.recruiter || userId === deal.sales) {
          byRecruiter.push(deal);
        }
      });
      console.log('byRecruiter', byRecruiter);
      dispatch(completeGetPerm(byRecruiter));
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
//----POST/GET EMPLOYEES-------///
//////////////////////////////////

export var postRecruiter = (data) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
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
//----USER ACTIONS-------///
//////////////////////////////////

export var login = (user) => {
  if (!user.displayName) {
    console.log('UUUSER', user);
    return {
      type: 'LOGIN',
      displayName: user.email,
      name: user.email,
      photo: 'http://lcta.ie/wp-content/uploads/2016/02/avatar-blank-icon.png',
      uid: user.uid,
      isAdmin: false,
      email: user.email
      } 
  } else {
    return {
      type: 'LOGIN',
      uid: user.uid,
      photo: user.photoURL,
      name: user.displayName,
      isAdmin: user.isAdmin,
      email: user.email
    };
    }
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
  return (dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
      //handle success
      console.log('worked', result);
      dispatch(login(result));
    }).catch((error) => {
      //handle error
      console.log('error', error);
    });
  }
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


