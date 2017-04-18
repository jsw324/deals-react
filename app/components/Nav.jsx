const React = require('react');
import ReactDOM from 'react-dom';
var {Link, IndexLink} = require('react-router');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';


class Nav extends React.Component{
  constructor (props) {
    super(props);
    this.homePageClick = this.homePageClick.bind(this);
  }

  homePageClick() {
    window.location.href = "/"
  }

  render () {
    return (
      <div>
        <nav className="white">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo left"><img style={{width:'50%',marginTop:'5px'}} src="https://assets.dice.com/external/images/empLogos/96125052f271581796a3f2a16c78d549.gif"/></a>
            <ul id="nav-mobile" className="right">
              <li><Link style={{color:'black'}} to="/login">Login</Link></li>
              <li><Link style={{color:'black'}} to="/new-contractor">New Deal</Link></li>
              <li><Link style={{color:'black'}} to="/get-perm">Perm Deals</Link></li>
            </ul>
          </div>
        </nav>
      </div>
      )
  }
};

export default Nav;
