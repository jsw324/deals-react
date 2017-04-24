export var getPermReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
    
    case 'COMPLETE_GET_PERM':
      return {
        isFetching: false,
        data: action.data
      };
    
    case 'COMPLETE_POST_PERM':
      return {
        isFetching: false,
        data: action.data
      };
    default:
      return state;
  }
};
