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

export var showContractorProfile = (contractor) => {
  return {
    type: 'SHOW_CONTRACTOR_PROFILE',
    modalProps: { contractor }
  }
}

export var hideContractorProfile = () => {
  return {
    type: 'HIDE_CONTRACTOR_PROFILE'
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
  if (data.isW2 === "1099") {
    data.spread = Math.floor((data.billRate - (data.hourly * 1.05)) * 40);
  } else {
     data.spread = Math.floor((data.billRate - (data.hourly * 1.15)) * 40);
  }
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

export var allContractors = (data) => {
  return {
    type: 'COMPLETE_GET_ALL_CONTRACTORS',
    data
  }
}

export var completeGetLeaderboard = (data) => {
  return {
    type: 'COMPLETE_GET_LEADERBOARD',
    data
  }
}

export var getContract = () => {
  return (dispatch, getState) => {
    var email = getState().auth.email;
    var recruiters = getState().recruiters;
    var isAdmin = getState().auth.isAdmin;
    //match logged in users email to email from FB to get Id
    var userId;
    recruiters.forEach((recruiter) => {
      if (email === recruiter.email) {
        userId = recruiter.id;
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
      // //get spread leaderboard
      var leaderboard = [];
      var recruiterSpread = 0;
      var salesSpread = 0;
      var dealCount = 0;
      var now = moment().unix();
      recruiters.forEach((recruiter) => {
        parsedDeals.forEach((deal) => {
          if (recruiter.id === deal.recruiter && (deal.completedDate === '' || deal.completedDate >  now) && deal.startDate < now) {
            recruiterSpread += deal.spread;
            dealCount++;
          } 
          if (recruiter.id === deal.sales && (deal.completedDate === '' || deal.completedDate >  now) && deal.startDate < now) {
            salesSpread += deal.spread;
            dealCount++;
          }
        })
        leaderboard.push({
          name: recruiter.name,
          salesSpread,
          recruiterSpread,
          dealCount
        });
        recruiterSpread = 0;
        salesSpread = 0;
        dealCount = 0;
      });
      if (isAdmin === true) {
        dispatch(completeGetContract(parsedDeals));
        dispatch(completeGetLeaderboard(leaderboard));
      } else {
        dispatch(completeGetContract(byRecruiter));
        dispatch(allContractors(parsedDeals));
        dispatch(completeGetLeaderboard(leaderboard));
      }
    })
  }
}

export var endContract = (contractors) => {
  return (dispatch, getState) => {
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

export var completePermLeaderboard = (data) => {
  return {
    type: 'COMPLETE_PERM_LEADERBOARD',
    data
  }
}

//firebase getPerm

export var getPerm = () => {
  return (dispatch, getState) => {
    var email = getState().auth.email;
    var recruiters = getState().recruiters;
    var isAdmin = getState().auth.isAdmin;
    // match logged in users email to email from FB to get ID
    var userId;
    recruiters.forEach((recruiter) => {
      if (email === recruiter.email) {
        userId = recruiter.id;
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
       var permLeaderboard = [];
       var salesFeeTotal = 0; 
       var recruiterFeeTotal = 0;
       var permDealCount = 0;
       recruiters.forEach((recruiter) => {
        parsedDeals.forEach((deal) => {
          var fee = deal.salary * (deal.fee/100);
          if (recruiter.id === deal.recruiter) {
            recruiterFeeTotal += fee;
            permDealCount++;
          } 
          if (recruiter.id === deal.sales) {
            salesFeeTotal += fee;
            permDealCount++;
          }
        })
        permLeaderboard.push({
          name: recruiter.name,
          salesFees: salesFeeTotal,
          recruiterFees: recruiterFeeTotal,
          permDealCount: permDealCount
        });
        salesFeeTotal = 0;
        recruiterFeeTotal = 0;
        permDealCount = 0;
      });
      console.log('FEEEEES', permLeaderboard);

      if (isAdmin === true) {
        dispatch(completeGetPerm(parsedDeals));
        dispatch(completePermLeaderboard(permLeaderboard));
      } else {
        dispatch(completeGetPerm(byRecruiter));
        dispatch(completePermLeaderboard(permLeaderboard));
      }
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
    var isAdmin = false;
    if (user.email === 'jwalkow@tallience.com') {
      isAdmin = true;
    }
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


