export var loginReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
    case 'START_LOGIN':
      return {
        isFetching: true,
        data: undefined
      };
    case 'COMPLETE_LOGIN':
      return {
        isFetching: false,
        data: action.data
      };
    default:
      return state;
  }
};
