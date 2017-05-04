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
    
   }

   renderContractor() {
     var { contractor, allContractors } = this.props;
     
    
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
     var { allContractors } = this.props;
        console.log('allcontractors', allContractors);
    //   allContractors.map((contractor) => {
    //    if (contractor.isW2 === "1099") {
    //      contractor.spread = format({prefix: '$'})(Math.floor((contractor.billRate - (contractor.hourly * 1.05)) * 40));
    //      return contractor;
    //    } else {
    //      contractor.spread = format({prefix: '$'})(Math.floor((contractor.billRate - (contractor.hourly * 1.15)) * 40)); 
    //      return contractor;
    //    }
    //  })
    
      var newSpread = allContractors.map((item) => {
       var spreadAgain = 0;
       if (item.isW2 === "1099") {
         spreadAgain = format({prefix: '$'})(Math.floor((item.billRate - (item.hourly * 1.05)) * 40));
       }  else {
      spreadAgain = format({prefix: '$'})(Math.floor((item.billRate - (item.hourly * 1.15)) * 40));
       }
       return {
         billRate: item.billRate,
         client: item.client,
         hourly: item.hourly,
         name: item.name,
         recruiter: item.recruiter,
         sales: item.sales,
         startDate: item.startDate,
         spread: spreadAgain
       }
     })
     
     console.log('newSpread', newSpread);
     console.log('allContractors', allContractors);
     return (
      <div>
      <ReactTable
              data={newSpread}
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