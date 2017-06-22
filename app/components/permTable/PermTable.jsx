import React from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css'

const PermTable = (props) => {
  var { deals } = props;
  //define columns of ReactTable component
    const columns = [{
      header: 'Name',
      accessor: 'name'  
    }, {
      header: 'Client',
      accessor: 'client'
    }, {
      id: 'startDate', // Required because our accessor is not a string 
      header: 'Start Date',
      accessor: 'startDate'
    }, {
      header: 'Recruiter',
      accessor: 'recruiter'
    }, {
      header: 'Sales',
      accessor: 'sales'
    }, {
      header: 'Salary',
      accessor: 'salary',
      id: 'salary'
    }, {
      header: 'Fee %',
      accessor: 'fee',
      id: 'fee'
    }, {
      header: 'Fee',
      accessor: 'feeAmount',
      id: 'feeAmount'
    }];

    return (
      <div className="content__container"> 
              <h5 className="center-align">Perm Placements</h5>
              <div className="divider"></div>
              <div className="perm__table">
                <ReactTable
                  data={deals}
                  columns={columns}
                  resizable="true"
                  defaultPageSize="10"
                  noDataText="No Deals yet. Better hit those phones!"
                  />
                </div>
              </div>
    )
}

export default PermTable;