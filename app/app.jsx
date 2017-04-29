const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');
import firebase from 'app/firebase/';

import Main from 'Main';
import Login from 'Login';
import GetPerm from 'GetPerm';

const actions = require('actions');
const store = require('configureStore').configure();

store.subscribe(() => {
  var state = store.getState();
  console.log('new state', state);
});


// Load foundation
// require('style!css!foundation-sites/dist/css/foundation.min.css');
// $(document).foundation();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user));
    hashHistory.push('/get-perm');
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
    replace('/get-perm');
  }
  next();
};


  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
          <Route path="/login" component={Login}/>
          <route path="/get-perm" component={GetPerm} onEnter={requireLogin}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
