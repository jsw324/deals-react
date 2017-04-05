const React = require('react');
import ReactDOM from 'react-dom';
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
  render: function() {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text"><IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Fight Camps</IndexLink></li>
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = Nav;
