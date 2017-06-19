import React from 'react';

var format = require('format-number');

const LeaderboardPure = (props) => {
  var { leader, spread, count } = props;
  return (
    <div>
      <p className="center-align">{count}. {leader}: {format({prefix: '$'})(spread)}</p>
    </div>
  )
};

export default LeaderboardPure;
