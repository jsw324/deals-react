export var getContractReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
     case 'START_POST_CONTRACT':
      return [];
    case 'COMPLETE_POST_CONTRACT':
      return [
        ...state, 
        {
          ...action.data
        }
      ];
     case 'START_GET_CONTRACT':
      return [];
    case 'COMPLETE_GET_CONTRACT':
      return [
        ...action.data
        ];
    default:
      return state;
  }
};
