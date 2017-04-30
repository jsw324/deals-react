 import React from 'react';
 import { connect } from 'react-redux';

 import moment from 'moment';
 var format = require('format-number');
 import ReactTable from 'react-table';

// import Contactor from 'Contractor';
 const columns = [{
    header: 'Name',
    accessor: 'name' // String-based value accessors! 
  }, {
    header: 'Client',
    accessor: 'client'
  }, {
    header: 'Recruiter',
    accessor: 'recruiter'
  }, {
    header: 'Sales',
    accessor: 'sales'
  }, {
    id: 'startDate', // Required because our accessor is not a string 
    header: 'Start Date',
    accessor: 'startDate'
  }, {
    header: 'Bill Rate',
    accessor: 'billRate',
    id: 'billRate'
  }, {
    header: 'Pay Rate',
    accessor: 'hourly',
    id: 'hourly'
  }, {
    header: 'Spread',
    accessor: 'spread',
    id: 'spread'
  }]

 class ContractList extends React.Component {
   constructor (props) {
     super(props);
     var {contractor, allContractors} = this.props;
     console.log('CONTRACTLIST', contractor);
     var spread;
     allContractors.forEach((contractor) => {
       if (contractor.isW2 === "1099") {
         contractor.spread = format({prefix: '$'})(Math.floor((contractor.billRate - (contractor.hourly * 1.05)) * 40));
       } else {
         contractor.spread = format({prefix: '$'})(Math.floor((contractor.billRate - (contractor.hourly * 1.15)) * 40)); 
       }
     })
       
   }

   renderContractor() {
     var { contractor } = this.props;
     if (contractor !== undefined) {
       if (typeof contractor.startDate === 'number') {
          contractor.startDate = moment.unix(contractor.startDate).format('MM/DD/YYYY');
        }
       
       return (
         <div className="row contractor__table">
          <ul>
          <li>{contractor.name}</li>
          <li>{contractor.client}</li>
          <li>{contractor.startDate}</li>
          <li>{contractor.billRate}</li>
          <li>{contractor.hourly}</li>
          <li>{contractor.spread}</li>
          <li><i className="small material-icons icon__color">thumb_down</i></li>   
          </ul>
          </div>
       )
     }
   }
   
   render () {
     var {contractor, allContractors} = this.props;
     return (
      <div>
      <ReactTable
              data={allContractors}
              columns={columns}
              resizable="true"
              defaultPageSize="10"
              />
        {this.renderContractor()}
      </div>
     )
   }
 }

 export default connect()(ContractList);