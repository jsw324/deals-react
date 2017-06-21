const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');
import firebase from 'app/firebase/';

import Main from './components/main/Main';
import Login from './components/main/Login';
import GetPerm from './components/main/GetPerm';
import Admin from './components/admin/Admin';
import Leaderboard from './components/leaderboard/Leaderboard';

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



  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
          <Route path="/login" component={Login}/>
          <route path="/leaderboard" component={Leaderboard} onEnter={requireLogin}/>
          <route path="/dashboard" component={GetPerm} onEnter={requireLogin}/>
          <route path="/admin" component={Admin} onEnter={requireLogin}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
