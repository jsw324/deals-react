const redux = require('redux');
const thunk = require('redux-thunk').default;

const {fightReducer} = require('./../reducers/fightReducer');
const {eventReducer} = require('./../reducers/eventReducer');

export var configure = () => {
  var reducer = redux.combineReducers({
    events: eventReducer,
    fights: fightReducer
  });

  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
