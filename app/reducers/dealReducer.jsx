export var dealReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
    case 'START_POST_PERM':
      return {
        isFetching: true,
        data: undefined
      };
    case 'COMPLETE_POST_PERM':
      return {
        isFetching: false,
        data: action.data
      };
    case 'START_POST_CONTRACT':
      return {
        isFetching: true,
        data: undefined
      };
    case 'COMPLETE_POST_CONTRACT':
      return {
        isFetching: false,
        data: action.data
      }
    default:
      return state;
  }
};
