import React from 'react';
const utils = require('./utils/utils.js');

var format = require('format-number');
const moment = require('moment');
import { Line } from 'react-chartjs-2';

const ContractChart = (props) => {
  var { spread } = props;
  //TODO: write utility function to store spread as an object, by contractor for easy access.
  utils.getSpread(spread);
  // get 6 months of week ending dates
  //TODO: change to trailing 6 months from the last Sunday from todays date.
  var dates = [];
  var startDateVar = moment().set({'year': 2017, 'month': 0, 'day': 7});
  for (var i = 0; i < 26; i++) {
    dates.push(startDateVar.format("MM/DD/YYYY"));
    startDateVar = startDateVar.add(7, 'days')
  }

  var contractorSpread = [];
  var weeklySpread;
  var today = new Date();

  //calculate spread for each contractor 
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
        // if contract is not completed, or the completed date is in the future and start date is in the past, add to
        //weekly spread
        if ((spread[j].completedDate == "" || spread[j].completedDate > dates[i]) && spread[j].startDate < dates[i]) {
          weeklySpread += spread[j].spread
        } 
      }
      //each week, push weeklySpread to contractorSpread array
        contractorSpread.push(weeklySpread);
        weeklySpread = 0;
      }
    }
    
  //user contractorSpread array to populate chartjs chart.
  var chartData = {
  labels: dates,
  datasets: [
      {
          label: "Contract",
          backgroundColor: 'rgba(253, 177, 2, 0.9)',
          borderColor: 'rgba(15, 39, 131, 0.9)',
          hoverBackgroundColor: 'rgb(253, 177, 2)',
          hoverBorderColor: 'rgb(253, 177, 2)',
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


export default ContractChart;
