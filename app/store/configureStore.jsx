const redux = require('redux');
const thunk = require('redux-thunk').default;

const {signUpReducer} = require('./../reducers/signUpReducer');
const {loginReducer} = require('./../reducers/loginReducer');
const {dealReducer} = require('./../reducers/dealReducer');
const {getPermReducer} = require('./../reducers/getPermReducer');
const {getContractReducer} = require('./../reducers/getContractReducer');
const {authReducer} = require('./../reducers/authReducer');

export var configure = () => {
  var reducer = redux.combineReducers({
    login: loginReducer,
    signup: signUpReducer,
    postDeal: dealReducer,
    getPerm: getPermReducer,
    getContract: getContractReducer,
    auth: authReducer,
  });

  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
