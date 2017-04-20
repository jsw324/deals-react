const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');
import firebase from 'app/firebase/';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from 'Main';
import Login from 'Login';
import SignUp from 'SignUp';
import AddContractor from 'AddContractor';
import AddPerm from 'AddPerm';
import GetPerm from 'GetPerm';

const actions = require('actions');
const store = require('configureStore').configure();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

store.subscribe(() => {
  var state = store.getState();
  console.log('new state', state);
});


// Load foundation
// require('style!css!foundation-sites/dist/css/foundation.min.css');
// $(document).foundation();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
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
    replace('/getPerm');
  }
  next();
};


  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/new-contractor" component={AddContractor} onEnter={requireLogin}/>
          <Route path="/new-perm" component={AddPerm}/>
          <route path="/get-perm" component={GetPerm} onEnter={requireLogin}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
