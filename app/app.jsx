const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

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

var isLoggedIn = {};
store.subscribe(() => {
  var state = store.getState();
  console.log('new state', state);
  isLoggedIn = store.getState().login;
});


// Load foundation
// require('style!css!foundation-sites/dist/css/foundation.min.css');
// $(document).foundation();


//App css
require('style!css!sass!applicationStyles');


  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Login} />
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/new-contractor" component={AddContractor}/>
          <Route path="/new-perm" component={AddPerm}/>
          <route path="/get-perm" component={GetPerm}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
