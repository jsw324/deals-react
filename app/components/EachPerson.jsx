import React from 'react';
import { connect } from 'react-redux';

class EachPerson extends React.Component { 
  constructor (props) {
    super (props);
  }

  render () {
    var { recruiter } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col s4">
            <p>{recruiter.name}</p>
          </div>
          <div className="col s4">
            <p>{recruiter.email}</p>
          </div>
          <div className="col s4">
            <p>{recruiter.id}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(EachPerson);