const React = require('react');
const Nav = require('Nav');

const AllFights = require('AllFights');
import Events from 'Events';

var Main = (props) => {
  return (
    <div>
      <Nav/>
        <div>
          <Events/>
        </div>
    </div>
  )
};

module.exports = Main;
