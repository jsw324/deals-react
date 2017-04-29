const redux = require('redux');
const thunk = require('redux-thunk').default;

const {dealReducer} = require('./../reducers/dealReducer');
const {getContractReducer} = require('./../reducers/getContractReducer');
const {authReducer} = require('./../reducers/authReducer');

export var configure = () => {
  var reducer = redux.combineReducers({
    getPerm: dealReducer,
    getContract: getContractReducer,
    auth: authReducer,
  });

  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
