export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        photo: action.photo,
        name: action.name,
        email: action.email
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  };
};