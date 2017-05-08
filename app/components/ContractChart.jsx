import React from 'react';
import { connect } from 'react-redux';

var format = require('format-number');
const moment = require('moment');
import {Line} from 'react-chartjs-2';

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

      // get 6 months of week ending dates
      var dates = [];
      var startDateVar = moment().set({'year': 2017, 'month': 0, 'day': 7});
      for (var i = 0; i < 26; i++) {
        dates.push(startDateVar.format("MM/DD/YYYY"));
        startDateVar = startDateVar.add(7, 'days')
      }

      var contractorSpread = [];
      var weeklySpread;
      var today = new Date();

      spread.forEach((val) => {
        if (val.isW2 === "1099") {
          val.spread = Math.floor((val.billRate - (val.hourly * 1.05)) * 40);
        } else {
          val.spread = Math.floor((val.billRate - (val.hourly * 1.15)) * 40);
        }
      })
      if (dates.length > 0 && spread.length > 0) { 
        for (var i = 0; i < dates.length; i++) {
          for (var j = 0; j < spread.length; j++) {
            if ((spread[j].completedDate == "" || spread[j].completedDate > dates[i]) && spread[j].startDate < dates[i]) {
              weeklySpread += spread[j].spread
            } 
          }
            contractorSpread.push(weeklySpread);
            weeklySpread = 0;
          }
        }
      
   
    var chartData = {
    labels: dates,
    datasets: [
        {
            label: "Contract",
            backgroundColor: 'rgba(100, 149, 237, 0.5)',
            borderColor: 'rgba(218, 165, 32, 0.5)',
            hoverBackgroundColor: '#F7464A',
            hoverBorderColor: '#DAA520',
            borderWidth: 1,
            data: contractorSpread,
        }
    ]
};

var chartOptions = {
   scaleOverride: true,
  scaleSteps: 8,
  scaleStepWidth: 2500,
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
      <Line data={chartData} options={chartOptions} />
    )
  }
}

export default connect()(ContractChart);
