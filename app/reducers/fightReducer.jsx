export var fightReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
    case 'START_GET_FIGHTS':
      return {
        isFetching: true,
        data: undefined
      };
    case 'COMPLETE_GET_FIGHTS':
      return {
        isFetching: false,
        data: action.data
      };
    default:
      return state;
  }
};
