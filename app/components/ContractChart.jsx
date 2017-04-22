import React from 'react';
import { connect } from 'react-redux';

const moment = require('moment');
var LineChart = require('react-chartjs').Line;


var getMonth = (month) => {
  var mom = moment.unix(month);
  return  mom.month();
}

class ContractChart extends React.Component {
  constructor (props) {
      super(props);
    }
  render () {
      var {spread} = this.props;
      console.log("SPREAD", spread);
      console.log('spread type', typeof spread);
      var obj = [];
      var jan= 0, feb = 0, march = 0, april = 0, may = 0, jun = 0;
      spread.map((val) => {
        var month = getMonth(val.startDate);
      var margin = Math.floor((val.billRate - (val.hourly * 1.15)) * 160);
        switch (month) {
          case 0:
            jan += margin;
            break;
          case 1:
            feb += margin;
            break;
          case 2:
            march += margin;
            break;
          case 3:
            april += margin;
            break;
          case 4:
            may += margin;
            console.log('margin', margin);
            break;
          case 5: 
            jun += margin;
            break;
        };
      });
      obj.push(jan, feb, march, april, may, jun);

    var chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            label: "Perm",
            fillColor: 'rgba(100, 149, 237, 0.5)',
            strokeColor: 'rgba(218, 165, 32, 0.5)',
            highlightStroke: '#F7464A',
            highlightFill: '#DAA520',
            borderWidth: 1,
            data: obj,
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
      <LineChart data={chartData} options={chartOptions} />
    )
  }
}

export default connect()(ContractChart);
