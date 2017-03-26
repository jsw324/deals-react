const React = require('react');
const axios = require('axios');
const moment = require('moment')
const {Link} = require('react-router');

const Event = require('Event');
const FightList = require('FightList');

class AllFights extends React.Component {
  constructor(props) {
    super(props);
    this.getFights();
    this.state = {fights: [], id: []};

  }

  componentDidMount () {
    this.getFights();
  }

  getFights() {
    var requestUrl = 'http://localhost:3500/fights';
    var fights = [];
    axios.get(requestUrl).then((res) => {
      if (!res) {
        throw new Error('unable to retrieve fights');
      } else {
        var data = res.data;
        this.setState({ fights: data});
      }
    }, function (res) {
      throw new Error('Unable to retrieve fights');
    });
  };

  render() {
    
    var {fights} = this.state;

    return <div>
      <h1 className="text-center">Upcoming Fights</h1>

      <FightList fights={fights}/>
    </div>
  }
};

module.exports = AllFights;
