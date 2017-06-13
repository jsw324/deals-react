import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import ContractList from 'ContractList';

class ContractorContainer extends React.Component {
  constructor (props) {
    super(props);
    //bind methods
    this.renderContractList = this.renderContractList.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  renderContractList() {
    var { contractors, toggleCompleted } = this.props;
    if (contractors.length > 0) {
      console.log('CONTRACTORS', contractors);
      contractors.sort((a, b) => {
        return a.completedDate - b.completedDate;
      });
      console.log('SORTED', contractors);
      //call ContractList component and pass allContractor object as prop
      var items = contractors.map((contractors) => {
        if (contractors.completedDate === '' || toggleCompleted === true) {
          return (
            <div key={contractors.id}><ContractList key={contractors.id} allContractors={contractors} /></div>
          )
        }
      });
      //return items for rendering in JSX
      return <div>{items}</div>
    } else {
      return (
            <h6 key="4" className="center-align">No Contractors on billing <i className="fa fa-frown-o" aria-hidden="true"></i></h6>
          )
      }
  };

  handleChecked (event) {
    var { dispatch } = this.props;
    event.preventDefault();
    const target = event.target;
    dispatch(actions.toggleCompletedContracts());
  }

  render() {
    return (
      <div>
        <div className="row contractor__header">
          <div className="content__container">
            <h5 className="center-align">Active Contractors <button className="btn center-align blue" onClick={ this.handleChecked }>Show Completed?</button></h5>
            <div className="col s2">
              <p className="center-align"><b>Name</b></p>
            </div>
            <div className="col s2">
              <p className="center-align"><b>Company</b></p>
            </div>
            <div className="col s2">
              <p className="center-align"><b>Start Date</b></p>
            </div>
            <div className="col s2">
              <p><b>Bill Rate</b></p>
            </div>
            <div className="col s2">
              <p><b>Pay Rate</b></p>
            </div>
            <div className="col s1">
              <p><b>Spread</b></p>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="row">
          {this.renderContractList()}
        </div>
      </div>
    )
  }
};

export default connect()(ContractorContainer);