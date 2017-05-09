export var toggleModalReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_PERM_MODAL':
      return !state;
    default:
      return state;
  }
}

