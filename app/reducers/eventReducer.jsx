export var eventReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
    case 'START_GET_EVENTS':
      return {
        isFetching: true,
        data: undefined
      };
    case 'COMPLETE_GET_EVENTS':
      return {
        isFetching: false,
        data: action.data
      };
    default:
      return state;
  }
};
