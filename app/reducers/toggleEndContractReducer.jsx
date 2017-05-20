const initialState = {
  show: false,
  modalProps: {}
}

export var toggleEndContractReducer = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_END_CONTRACT_MODAL':
      return {
        show: true,
        modalProps: action.modalProps
      }
    case 'HIDE_END_CONTRACT_MODAL':
      return initialState
    default: 
      return state;
  }
}