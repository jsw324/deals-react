const React = require('react');

import Nav from 'Nav';
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
