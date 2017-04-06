const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from 'Main';
import Events from 'Events';
import FightList from 'FightList';

const actions = require('actions');
const store = require('configureStore').configure();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

store.subscribe(() => {
  var state = store.getState();
  console.log('new state', state);
});

store.dispatch(actions.getEvents());

// Load foundation
// require('style!css!foundation-sites/dist/css/foundation.min.css');
// $(document).foundation();


//App css
require('style!css!sass!applicationStyles');

  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Events} />
          <Route path="/FightList/:id" component={FightList}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
