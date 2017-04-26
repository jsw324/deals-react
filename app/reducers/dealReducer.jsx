export var dealReducer = (state = [], action) => {
  switch (action.type) {
    
   
    case 'COMPLETE_GET_PERM':
      return [
          ...action.data
      ];
    
    
    case 'COMPLETE_POST_PERM':
      return [
          ...state,
          {
            ...action.data
          }
      ];
   
    default:
      return state;
  }
};
