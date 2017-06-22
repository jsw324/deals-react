import React from 'react';
import { connect } from 'react-redux';

import ReactTable from 'react-table';
import 'react-table/react-table.css'

import LeaderboardContainer from 'LeaderboardContainer';

class Leaderboard extends React.Component {
  constructor (props) {
    super (props);
  }
  render () {
    var { leaderboard, permLeaderboard } = this.props;

    //define columns of ReactTable component
    const columns = [{
    header: 'Name',
    accessor: 'name'  
  }, {
    id: 'salesSpread',
    header: 'Sales Spread',
    accessor: 'salesSpread'
  },{
    id: 'recruiterSpread',
    header: 'Recruiter Spread',
    accessor: 'recruiterSpread'
  },{
    id: 'dealCount',
    header: 'dealCount',
    accessor: 'dealCount'
  }]

   //define columns of ReactTable component
    const permColumns = [{
    header: 'Name',
    accessor: 'name'  
  }, {
    id: 'salesFees',
    header: 'Sales Fees',
    accessor: 'salesFees'
  },{
    id: 'recruiterFees',
    header: 'Recruiter Fees',
    accessor: 'recruiterFees'
  }, {
    id: 'permDealCount',
    header: 'Deal Count',
    accessor: 'permDealCount'
  }];


    console.log('lederboard', leaderboard);
    return (
      <div className="container">
        <h2 className="center-align">Leaderboard</h2>
        <LeaderboardContainer/>
        <h4 className="center-align">Spread</h4>
        <ReactTable
                  data={leaderboard}
                  columns={columns}
                  resizable="true"
                  defaultPageSize="10"
                  noDataText="No Deals yet. Better hit those phones!"
                  />
        <br/>
        <h4 className="center-align">Perm</h4>
        <ReactTable
                  data={permLeaderboard}
                  columns={permColumns}
                  resizable="true"
                  defaultPageSize="10"
                  noDataText="No Deals yet. Better hit those phones!"
                  />
      </div>
    )
  }
}

var mapStateToProps = (state) => {
   return (
     { 
      leaderboard: state.leaderboard,
      permLeaderboard: state.permLeaderboard
    }
   )
 }

export default connect(mapStateToProps)(Leaderboard);