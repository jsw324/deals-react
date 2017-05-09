 import React from 'react';
 import { connect } from 'react-redux';


 import moment from 'moment';
 var format = require('format-number');
 const actions = require('actions'); 

 class PermList extends React.Component {
   constructor (props) {
     super(props);
   }
   
  render () {
    var { allPerm } = this.props;
    return (
      <div className="contractor__container">
          <div className="collection z-depth-2 contractor__list">
            <ul>
              <div className="col s2">
                <li className="collection-item">{allPerm.name}</li>
              </div>

              <div className="col s2">
                <li className="">{allPerm.client}</li>
              </div>

              <div className="col s2">
                <li className="">{allPerm.startDate}</li>
              </div>

              <div className="col s2">
                <li className="">{format({prefix: '$' })(allPerm.salary)}</li>
              </div>

              <div className="col s2">
                <li className="">{allPerm.fee}%</li>
              </div>

              <div className="col s1">
                <li className="">{allPerm.feeAmount}</li>
              </div>
            </ul>
          </div>
        </div>
    )
   }
 }

 export default connect()(PermList);