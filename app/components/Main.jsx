const React = require('react');
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux';

import Nav from 'Nav';

class Main extends React.Component {
  constructor (props) {
    super (props);
  }

  render() {
    var { auth } = this.props;
    var props = this.props;
    return (
        <div>
          <Nav auth={auth}/>
          <div className="main">
            {props.children}
          </div>
        </div>
    )
  }
};

export default connect(
  (state) => {
    return state;
  }
)(Main);
