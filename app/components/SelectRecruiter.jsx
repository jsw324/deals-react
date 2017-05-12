import React from 'react';
import { connect } from 'react-redux';

//test component for recruiter dropdowns in future feature.

class SelectRecruiter extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    var { recruiters } = this.props;
    return (
      <option value={recruiters.userId}>{recruiters.name}</option>
    )
  };
};

export default connect()(SelectRecruiter);