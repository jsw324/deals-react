export var subtractPtoDays = (state = [], action) => {
  switch (action.type) {
    // TODO: implmement redux correctly
    case 'COMPLETE_POST_RECRUITER':
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
