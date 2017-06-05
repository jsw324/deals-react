import React from 'react';
import { connect } from 'react-redux';

const utils = require('./../utils/utils.js');
const moment = require('moment');
import { Bar } from 'react-chartjs-2';

class PermChart extends React.Component {
  constructor (props) {
      super(props);
    }
  render () {
      var { deals } = this.props;
      console.log('deals', deals);
      var obj = [];
      var jan= 0, feb = 0, march = 0, april = 0, may = 0, jun = 0;
      // iterate over each deal, pushing to the corresponding month.
      // End result is to create an array with the total amount of fees for each month.
        deals.map((val) => {
         // val.startDate = moment.unix(val.startDate).format('MM/DD/YYYY');
          var month = utils.getMonth(val.startDate);
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
            label: "Full-Time",
            backgroundColor: 'rgba(15, 39, 131, 0.9)',
            borderColor: 'rgba(253, 177, 2, 0.9)',
            hoverBackgroundColor: 'rgb(253, 177, 2)',
            hoverBorderColor: 'rgb(253, 177, 2)',
            borderWidth: 1,
            data: obj
        }
    ]
};

//chart options
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