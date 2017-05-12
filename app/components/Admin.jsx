import React from 'react';
import { connect } from 'react-redux';

import ShowRecruiters from 'ShowRecruiters';
import AddRecruiters from 'AddRecruiters';

//This feature is not fully implemented.

class Admin extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    console.log('admin props', this.props);
    return (
      <div>
        <AddRecruiters/>
        <ShowRecruiters/>
      </div>
    )
  }
}

export default connect()(Admin);