export var recruiterReducer = (state = [], action) => {
  switch (action.type) {
    case 'COMPLETE_POST_RECRUITER':
      return [
        ...state,
        {
          ...action.data
        }
      ];

    case 'COMPLETE_GET_RECRUITERS':
      return [
        ...action.data
      ];

    default: 
        return state;
  }
};