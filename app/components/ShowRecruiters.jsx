import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import EachPerson from 'EachPerson';

class ShowRecruiters extends React.Component {
  constructor (props) {
    super (props);
    console.log('showw props', this.props);
    this.renderData = this.renderData.bind(this);
  };

  componentWillMount() {
    var { dispatch } = this.props;
    dispatch(actions.getRecruiters());
  }

  renderData() {
    console.log('show props', this.props);
    var { recruiters } = this.props;
    if (recruiters.length > 0) {
      console.log('recruiters', recruiters);
      var items = recruiters.map((people) => {
        return (
          <div>
            <EachPerson key={people.id} recruiter={people}/>
          </div>
        )
      });
      return <div>{items}</div>
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
  }

  render () {
    return (
    <div>{this.renderData()}</div>
    )
  }
};

export default connect(
  (state) => {
    return state;
  }
)(ShowRecruiters);