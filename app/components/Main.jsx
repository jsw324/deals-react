const React = require('react');
const Nav = require('Nav');

const AllFights = require('AllFights');
import Events from 'Events';

var Main = (props) => {
  return (
    <div>
      <Nav/>
      <div>
        <div>
          <p>Main.jsx Rendered</p>
          <Events/>
        </div>
      </div>
    </div>
  )
};

module.exports = Main;
