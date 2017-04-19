export var getContractReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
    case 'START_GET_CONTRACT':
      return {
        isFetching: true,
        data: undefined
      };
    case 'COMPLETE_GET_CONTRACT':
      return {
        isFetching: false,
        data: action.data
      };
    default:
      return state;
  }
};
