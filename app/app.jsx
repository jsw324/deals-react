const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');
const Main = require('Main');
const AllFights = require('AllFights');
const Event = require('Event');

const actions = require('actions');
const store = require('configureStore').configure();

store.subscribe(() => {
  var state = store.getState();
  console.log('new state', state);
});


// Load foundation
require('style!css!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

//App css
require('style!css!sass!applicationStyles');

store.dispatch(actions.getEvents());
store.dispatch(actions.getFights());

  ReactDOM.render(
    <Provider store={store}>
      <Main/>
    </Provider>,
    document.getElementById('app')
  );
