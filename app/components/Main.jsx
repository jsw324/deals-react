const React = require('react');
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux';

import Nav from 'Nav';

var Main = (props) => {
  console.log('MAIN', props.children);
  return (
      <div>
       
        <div className="main">
          {props.children}
        </div>
      </div>
  )
};

export default connect()(Main);
