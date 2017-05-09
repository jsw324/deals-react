const React = require('react');
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux';

import Nav from 'Nav';

var Main = (props) => {
  return (
      <div>
        <div className="main">
          {props.children}
        </div>
      </div>
  )
};

export default connect()(Main);
