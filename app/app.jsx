const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');
import firebase from 'app/firebase/';

import Main from 'Main';
import Login from 'Login';
import GetPerm from 'GetPerm';
import Admin from 'Admin';
import Leaderboard from 'Leaderboard';

const actions = require('actions');
const store = require('configureStore').configure();

store.subscribe(() => {
  var state = store.getState();
  console.log('new state', state);
});



firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var isAdmin = false;
    if (user.email === 'jwalkow@tallience.com' || user.email === 'gnacron@tallience.com') {
      isAdmin = true;
    }
    if (user.displayName) {
      store.dispatch(actions.login(user));
      hashHistory.push('/dashboard');
    } else {
      var nonGoogleUser = {
        displayName: user.email,
        photoURL: 'http://lcta.ie/wp-content/uploads/2016/02/avatar-blank-icon.png',
        uid: user.uid,
        email: user.email,
        isAdmin: isAdmin
      }
      store.dispatch(actions.login(nonGoogleUser));
      hashHistory.push('/dashboard');
    }
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
})


//App css
require('style!css!sass!applicationStyles');

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) { 
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/dashboard');
  }
  next();
};

var redirectIfIsAdmin = (nextState, replace, next) => {
  var admin = store.getState().auth.isAdmin;
  if (admin === true) {
   next()
  } else {
    replace('/dashboard');
  }
  next();
}

  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
          <Route path="/login" component={Login}/>
          <route path="/leaderboard" component={Leaderboard} onEnter={requireLogin}/>
          <route path="/dashboard" component={GetPerm} onEnter={requireLogin}/>
          <route path="/admin" component={Admin} onEnter={redirectIfIsAdmin}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
