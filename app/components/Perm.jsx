import React from 'react';
import { connect } from 'react-redux';

import ReactTable from 'react-table';

class Perm extends React.Component { 
  constructor (props) {
    super (props);
    this.renderDeals = this.renderDeals.bind(this);
  }

  renderDeals() {
    var { 
      name, 
      client,
      salary,
      fee,
      recruiter,
      sales,
      startDate
   } = this.props.deals;
    console.log('name', name);
    if (name) {
      return (
        <table className="bordered striped highlight responsive-table">
      
          <tbody>
            <tr>
              <td>{name}</td>
              <td>{client}</td>
              <td>{startDate}</td>
              <td>{recruiter}</td>
              <td>{sales}</td>
              <td>${salary}</td>
              <td>{fee}%</td>
            </tr>
          </tbody>
          </table> 
      )
    }
  }

  render () {
    var { name, client, startDate, recruiter, sales, salary, fee } = this.props.deals;
    const data = [{
    name: name,
    client: client,
    startDate: startDate,
    recruiter: recruiter,
    sales,
    salary,
    fee
  }]
 
  const columns = [{
    header: 'Name',
    accessor: 'name' // String-based value accessors! 
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
    header: 'Fee',
    accessor: 'fee',
    id: 'fee'
  }]
    return (
      <ReactTable
        data={data}
        columns={columns}
        />
    )
  }
};

export default connect()(Perm);