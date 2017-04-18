import React from 'react';
import { connect } from 'react-redux';

var BarChart = require('react-chartjs').Bar;




class PermChart extends React.Component {
  constructor (props) {
      super(props);
    }
  render () {
      var {deals} = this.props;
      console.log('chart props', deals.deals);
      var obj = [];
      deals.deals.map((val) => {
        obj.push(
          val.salary * (val.fee/100)
        )
      });
      console.log('chart obj', obj);

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
          fillColor: 'rgba(100, 149, 237, 0.5)',
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
        <BarChart className="col s12 m10 offset-m1" data={chartData} options={chartOptions} width="800" height="400" />
      </div>
    )
  }
}

export default connect()(PermChart);