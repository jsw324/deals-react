const redux = require('redux');
const thunk = require('redux-thunk').default;

const {dealReducer} = require('./../reducers/dealReducer');
const {getContractReducer} = require('./../reducers/getContractReducer');
const {authReducer} = require('./../reducers/authReducer');
const {toggleModalReducer} = require('./../reducers/toggleModalReducer');
const {toggleContractModalReducer} = require('./../reducers/toggleContractModalReducer');
const {toggleEndContractReducer} = require('./../reducers/toggleEndContractReducer');
const {recruiterReducer} = require('./../reducers/recruiterReducer');
const {toggleCompletedContractsReducer} = require('./../reducers/toggleCompletedContractsReducer');
const {allContractorsReducer} = require('./../reducers/allContractorsReducer');
const {leaderboardReducer} = require('./../reducers/leaderboardReducer');
const {permLeaderboardReducer} = require('./../reducers/permLeaderboardReducer');
const {toggleContractorProfile} = require('./../reducers/toggleContractorProfile');
const { subtractPtoDaysReducer } = require('./../reducers/subtractPtoDaysReducer');

export var configure = () => {
  var reducer = redux.combineReducers({
    getPerm: dealReducer,
    getContract: getContractReducer,
    allContractors: allContractorsReducer,
    leaderboard: leaderboardReducer,
    permLeaderboard: permLeaderboardReducer,
    auth: authReducer,
    permModal: toggleModalReducer,
    contractModal: toggleContractModalReducer,
    profileModal: toggleContractorProfile,
    endContractModal: toggleEndContractReducer,
    toggleCompletedContracts: toggleCompletedContractsReducer,
    recruiters: recruiterReducer
  });

  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
