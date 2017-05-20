import React from 'react';
import { connect } from 'react-redux';

//test component for recruiter dropdowns in future feature.

class SelectRecruiter extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    var { employee } = this.props;
    console.log('employee', employee);
    return (
      <option value={employee.userId}>{employee.name}</option>
    )
  };
};

export default SelectRecruiter;