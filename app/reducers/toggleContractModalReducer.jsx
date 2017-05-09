export var toggleContractModalReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_CONTRACT_MODAL':
      return !state;
    default: 
      return state;
  }
}