import React from 'react';
import { connect } from 'react-redux';

import AddRecruiters from 'AddRecruiters';

class Admin extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AddRecruiters/>
      </div>
    )
  }
}

export default connect()(Admin);