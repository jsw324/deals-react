import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import EachEmployee from 'EachEmployee';

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
      var items = recruiters.map((people) => {
        return (
          <EachEmployee key={people.id} recruiter={people}/>
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