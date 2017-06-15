import React from 'react';
const utils = require('./../utils/utils.js');

var format = require('format-number');
const moment = require('moment');
import { Line } from 'react-chartjs-2';

const ContractChart = (props) => {
  var { spread } = props;
  var weeklySpread = utils.getSpread(spread);
  var dates = weeklySpread.map((week) => week.date);
  var spd = weeklySpread.map((week) => week.spread);
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
          data: spd,
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
