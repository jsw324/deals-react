const React = require('react');
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import Nav from 'Nav';


var Main = (props) => {
  return (
      <div>
        <Nav/>
          <div>
            {props.children}
          </div>
      </div>
  )
};

module.exports = Main;
