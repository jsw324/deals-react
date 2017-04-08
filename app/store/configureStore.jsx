const redux = require('redux');
const thunk = require('redux-thunk').default;

const {signUpReducer} = require('./../reducers/signUpReducer');

export var configure = () => {
  var reducer = redux.combineReducers({
    login: signUpReducer
  });

  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
