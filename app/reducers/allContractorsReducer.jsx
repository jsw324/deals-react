export var allContractorsReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
    case 'COMPLETE_GET_ALL_CONTRACTORS':
      return [
        ...action.data
        ];
    default:
      return state;
  }
};
