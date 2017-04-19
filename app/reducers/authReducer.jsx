export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        photo: action.photo,
        name: action.name
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  };
};