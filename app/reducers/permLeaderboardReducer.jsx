export var permLeaderboardReducer = (state = {isFetching: false, data: undefined}, action) => {
  switch (action.type) {
    case 'COMPLETE_PERM_LEADERBOARD':
      return [
        ...action.data
        ];
    default:
      return state;
  }
};