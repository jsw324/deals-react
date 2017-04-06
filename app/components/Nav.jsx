const React = require('react');
import ReactDOM from 'react-dom';
var {Link, IndexLink} = require('react-router');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';


const styles = {
  title: {
    cursor: 'pointer',
  },
};

var Nav = () => (
    <MuiThemeProvider>
      <AppBar
        className="red"
        title={<span style={styles.title}>Fight Camps</span>}
        onTitleTouchTap={() => alert('help')} />
    </MuiThemeProvider>

);

export default Nav;
