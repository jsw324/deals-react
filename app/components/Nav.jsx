const React = require('react');
import ReactDOM from 'react-dom';
var {Link, IndexLink} = require('react-router');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';


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
        <MuiThemeProvider>
          <AppBar
            className="black navbar__top"
            title={<span style={{cursor:'pointer'}}>Fight Camps</span>}
            onClick={this.homePageClick} />
        </MuiThemeProvider>
      )
  }
};

export default Nav;
