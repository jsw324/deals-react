import React from 'react';
import { connect } from 'react-redux';

const moment = require('moment');
//var BarChart = require('react-chartjs').Bar;
import {Bar} from 'react-chartjs-2';


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
      
      var obj = [];
      var jan= 0, feb = 0, march = 0, april = 0, may = 0, jun = 0;
        deals.map((val) => {
          var month = getMonth(val.startDate);
          var fee = val.fee/100 * val.salary;
          
          switch (month) {
            case 0:
              jan += fee;
              break;
            case 1:
              feb += fee;
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

    var chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            label: "Perm",
            backgroundColor: 'rgba(100, 149, 237, 0.5)',
            borderColor: 'rgba(218, 165, 32, 0.5)',
            hoverBackgroundColor: '#F7464A',
            hoverBorderColor: '#DAA520',
            borderWidth: 1,
            data: obj
        }
    ]
};

var chartOptions = {
   scaleOverride: true,
  scaleSteps: 6,
  scaleStepWidth: 25000,
  scaleStartValue: 0,
  scaleLineColor: 'rgba(0, 0, 0, 0.1)',
  scaleLineWidth: 1,
  scaleShowLabels: true,
  scaleLabel:
    function(label){return  '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},
   multiTooltipTemplate: 
    function(label){return  '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},
   tooltipTemplate: 
    function(label){return  '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},
    responsive: true
}

    return (
      <Bar data={chartData} options={chartOptions} />
 
    )
  }
}

export default connect()(PermChart);