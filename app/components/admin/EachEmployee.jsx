import React from 'react';

const EachEmployee = (props) => { 
  var { recruiter } = props;
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
          <p>{recruiter.userId}</p>
        </div>
      </div>
    </div>
  )
  }


export default EachEmployee;