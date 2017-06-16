const initialState = {
  show: false,
  modalProps: {}
}

export var toggleContractorProfile = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_CONTRACTOR_PROFILE':
      return {
        show: true,
        modalProps: action.modalProps
      }
    case 'HIDE_CONTRACTOR_PROFILE':
      return initialState
    default: 
      return state;
  }
}