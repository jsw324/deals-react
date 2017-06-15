export var leaderboardReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
    case 'COMPLETE_GET_LEADERBOARD':
      return [
        ...action.data
        ];
    default:
      return state;
  }
};