import React from 'react';
import { connect } from 'react-redux';

import LeaderboardPure from './LeaderboardPure';

class LeaderboardContainer extends React.Component {
  constructor (props) {
    super (props);
    this.salesSpreadLeaders = this.salesSpreadLeaders.bind(this);
    this.recruiterSpreadLeaders = this.recruiterSpreadLeaders.bind(this);
    this.permSalesLeaders = this.permSalesLeaders.bind(this);
    this.permRecruiterLeaders = this.permRecruiterLeaders.bind(this);
  }
  salesSpreadLeaders() {
    var { leaderboard } = this.props;
    if (leaderboard.data !== 'undefined') {
        leaderboard.sort((a, b) => {
          return b.salesSpread - a.salesSpread
        })
        var count = 0;
        var items = leaderboard.map((leader) => {
          count++;
          if (leader.salesSpread > 0) {
            return (
              <div key={leader.name}><LeaderboardPure count={count} leader={leader.name} spread={leader.salesSpread} /></div>
            )
          }
      })
      return (
        <div className="contract__box">
          <div className="perm__chart z-depth-3">
            <h5 className="center-align"><b>Sales Spread Leaders</b></h5>
            <div className="divider"></div>
            {items}
          </div>
        </div>
      )
    }
  }

recruiterSpreadLeaders() {
    var { leaderboard } = this.props;
    leaderboard.sort((a, b) => {
      return b.recruiterSpread - a.recruiterSpread
    })
    var count = 0;
    var items = leaderboard.map((leader) => {
      count++;
      if (leader.recruiterSpread > 0) {
        return (
          <div key={leader.name}><LeaderboardPure count={count} leader={leader.name} spread={leader.recruiterSpread} /></div>
        )
      }
   })
   return (
      <div className="contract__box">
        <div className="perm__chart z-depth-3">
          <h5 className="center-align"><b>Recruiter Spread Leaders</b></h5>
          <div className="divider"></div>
          {items}
        </div>
      </div>
   )
  }

  permSalesLeaders() {
    var { permLeaderboard } = this.props;
    console.log("SALES", permLeaderboard);
    permLeaderboard.sort((a, b) => {
      return b.salesFees - a.salesFees
    })
    var count = 0;
    var items = permLeaderboard.map((leader) => {
      count++;
      if (leader.salesFees > 0) {
        return (
          <div key={leader.name}><LeaderboardPure count={count} leader={leader.name} spread={leader.salesFees} /></div>
        )
      }
   })
   return (
      <div className="contract__box">
        <div className="perm__chart z-depth-3">
          <h5 className="center-align"><b>Perm Sales Leaders</b></h5>
          <div className="divider"></div>
          {items}
        </div>
      </div>
   )
  }

  permRecruiterLeaders() {
    var { permLeaderboard } = this.props;
    permLeaderboard.sort((a, b) => {
      return b.recruiterFees - a.recruiterFees
    })
    var count = 0;
    var items = permLeaderboard.map((leader) => {
      count++;
      if (leader.recruiterFees > 0) {
        return (
          <div key={leader.name}><LeaderboardPure count={count} leader={leader.name} spread={leader.recruiterFees} /></div>
        )
      }
   })
   return (
      <div className="contract__box">
        <div className="perm__chart z-depth-3">
          <h5 className="center-align"><b>Perm Recruiter Leaders</b></h5>
          <div className="divider"></div>
          {items}
        </div>
      </div>
   )
  }
  
  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 m6 l6">
            {this.salesSpreadLeaders()}
          </div>
          <div className="col s6 m6 l6">
            {this.recruiterSpreadLeaders()}
          </div>
        </div>
        <div className="row">
          <div className="col s6 m6 l6">
            {this.permSalesLeaders()}
          </div>
          <div className="col s6 m6 l6">
            {this.permRecruiterLeaders()}
          </div>
        </div>
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

export default connect(mapStateToProps)(LeaderboardContainer);