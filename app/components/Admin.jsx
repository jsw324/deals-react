import React from 'react';
import { connect } from 'react-redux';

import ShowRecruiters from 'ShowRecruiters';
import AddRecruiters from 'AddRecruiters';

//This feature is not fully implemented.

const Admin = (props) => {
  var { recruiters } = props;
  return (
    <div>
      <AddRecruiters/>
      <ShowRecruiters recruiters={recruiters}/>
    </div>
  )
}

var mapStateToProps = (state) => {
  return { recruiters: state.recruiters }
}

export default connect(mapStateToProps)(Admin);