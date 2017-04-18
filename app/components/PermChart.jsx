import React from 'react';
import { connect } from 'react-redux';

const moment = require('moment');
var LineChart = require('react-chartjs').Line;


var getMonth = (month) => {
  var mom = moment(month, 'MM/DD/YYYY');
  return  mom.month();
}

class PermChart extends React.Component {
  constructor (props) {
      super(props);
    }
  render () {
      var {deals} = this.props;
      console.log('chart props', deals.deals);
      var obj = [];
      var jan= 0, feb = 0, march = 0, april = 0, may = 0, jun = 0;
      deals.deals.map((val) => {
        var month = getMonth(val.startDate);
        var fee = val.fee/100 * val.salary;
        console.log(fee);
        switch (month) {
          case 0:
            jan += fee;
            console.log('jan', jan);
            break;
          case 1:
            feb += fee;
            console.log('feb', feb);
            break;
          case 2:
            march += fee;
            break;
          case 3:
            april += fee;
            break;
          case 4:
            may += fee;
            break;
          case 5: 
            jun += fee;
            break;
        };
      });
      obj.push(jan, feb, march, april, may, jun);
      console.log('chart sum', obj);

    var chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Perm",
            fillColor: 'rgba(100, 149, 237, 0.5)',
            strokeColor: 'rgba(218, 165, 32, 0.5)',
            highlightStroke: '#F7464A',
            highlightFill: '#DAA520',
            borderWidth: 1,
            data: obj,
        },
        {
          label: 'Spread',
          fillColor: 'rgba(218, 165, 32, 0.5)',
          strokeColor: 'rgba(218, 165, 32, 0.5)',
          highlightStroke: '#F7464A',
          highlightFill: '#DAA520',
          borderWidth: 1,
          data: [10550, 9850, 11658, 12655, 13500, 14250, 16075],
      }
    ]
};

var chartOptions = {
   scaleLabel:
    function(label){return  '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
}

    return (
      <div className="row">
        <LineChart className="col s12 m10 offset-m1" data={chartData} options={chartOptions} width="800" height="400" />
      </div>
    )
  }
}

export default connect()(PermChart);