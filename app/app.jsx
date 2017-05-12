const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');
import firebase from 'app/firebase/';

import Main from 'Main';
import Login from 'Login';
import GetPerm from 'GetPerm';
import Admin from 'Admin';

const actions = require('actions');
const store = require('configureStore').configure();

store.subscribe(() => {
  var state = store.getState();
  console.log('new state', state);
});



firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('USER%', user);
    if (user.displayName) {
      store.dispatch(actions.login(user));
      hashHistory.push('/dashboard');
    } else {
      var nonGoogleUser = {
        displayName: user.email,
        photoURL: 'http://lcta.ie/wp-content/uploads/2016/02/avatar-blank-icon.png',
        uid: user.uid
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
          <route path="/dashboard" component={GetPerm} onEnter={requireLogin}/>
          <route path="/admin" component={Admin} onEnter={requireLogin}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
