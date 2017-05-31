import React from 'react';

import EachEmployee from 'EachEmployee';

const ShowRecruiters = (props) => {
    var { recruiters } = props;
    if (recruiters.length > 0) {
      var items = recruiters.map((people) => {
        return (
          <EachEmployee key={people.id} recruiter={people}/>
        )
      });
      return <div>{items}</div>
    } else {
      return (
        <div>
          <p>No recruiters found.</p>
        </div>
      )
    }
  };

export default ShowRecruiters;