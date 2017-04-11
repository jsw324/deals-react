export var getPermReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
    case 'START_GET_PERM':
      return {
        isFetching: true,
        data: undefined
      };
    case 'COMPLETE_GET_PERM':
      return {
        isFetching: false,
        data: action.data
      };
    default:
      return state;
  }
};
