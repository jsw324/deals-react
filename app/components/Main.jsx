const React = require('react');
const Nav = require('Nav');

import Events from 'Events';
import FightList from 'FightList';

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
