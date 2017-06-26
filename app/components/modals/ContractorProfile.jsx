import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

const utils = require('./../utils/utils.js');

const ContractorProfile = (props) => {
  var { contractor, recruiters, dispatch } = props;
  var recruiter = utils.getRecruiterName(contractor.recruiter, recruiters);
  var sales = utils.getRecruiterName(contractor.sales, recruiters);
  var startDate = utils.formatDate(contractor.startDate);
  var completedDate;
  if (contractor.completedDate === '') {
    completedDate = 'ACTIVE';
  } else {
    completedDate = utils.formatDate(contractor.completedDate);
  }
  return (
    <div className="row">
      <div className="col s3">
        <img src="wallpaper.png" className="responsive-img"/>
        <h5>{contractor.name}</h5>
        <h6><b>client: </b>{contractor.client}</h6>
        <h6><b>Start Date: </b>{startDate}</h6>
        <h6><b>End Date: </b>{completedDate}</h6>
      </div>
      <div className="col s9">
        <h2 className="center-align">{contractor.name} Profile</h2>
        <div className="divider"></div>
        <p><b>Bill Rate: </b>{contractor.billRate}</p>
        <p><b>Pay Rate: </b>{contractor.hourly}</p>
        <p><b>Spread: </b>{contractor.spread}</p>
        <p><b>Sales: </b>{sales}</p>
        <p><b>Recruiter: </b>{recruiter}</p>
        <p><b>W2 or 1099: </b>{contractor.isW2}</p>
        <p><b>State: </b>{contractor.state}</p>
        <br/><br/>
        <button className="btn red" onClick={() => dispatch(actions.hideContractorProfile())}>Cancel</button>
      </div>
		</div>
  )
}

export default connect()(ContractorProfile);