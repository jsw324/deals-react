 import React from 'react';
 import { connect } from 'react-redux';

 import moment from 'moment';
 var format = require('format-number');

// import Contactor from 'Contractor';

 class ContractList extends React.Component {
   constructor (props) {
     super(props);
     var {contractor} = this.props;
     console.log('CONTRACTLIST', contractor);
   }

   renderContractor() {
     var { contractor } = this.props;
     if (contractor !== undefined) {
       if (typeof contractor.startDate === 'number') {
          contractor.startDate = moment.unix(contractor.startDate).format('MM/DD/YYYY');
        }
       var spread;
       if (contractor.isW2 === "1099") {
         contractor.spread = format({prefix: '$'})(Math.floor((contractor.billRate - (contractor.hourly * 1.05)) * 40));
       } else {
         contractor.spread = format({prefix: '$'})(Math.floor((contractor.billRate - (contractor.hourly * 1.15)) * 40)); 
       }
       return (
         <div className="row">
          <div className="col s2">
            {contractor.name}
          </div>
          <div className="col s2">
            {contractor.client}
          </div>
          <div className="col s2">
            {contractor.startDate}
          </div>
          <div className="col s2">
            {contractor.billRate}
          </div>
          <div className="col s2">
            {contractor.hourly}
          </div>
          <div>
            {contractor.spread}
          </div>
         </div>
       )
     }
   }
   
   render () {
     var {contractor} = this.props;
     return (
      <div>
        {this.renderContractor()}
      </div>
     )
   }
 }

 export default connect()(ContractList);