export var signUpReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
    case 'START_POST_SIGNUP':
      return {
        isFetching: true,
        data: undefined
      };
    case 'COMPLETE_POST_SIGNUP':
      return {
        isFetching: false,
        data: action.data
      };
    default:
      return state;
  }
};
