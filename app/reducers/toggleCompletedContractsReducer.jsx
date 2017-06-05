export var toggleCompletedContractsReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_COMPLETED_CONTRACTS':
      return !state;
    default: 
      return state;
  }
}