const React = require('react');
import ReactDOM from 'react-dom';
var {Link, IndexLink} = require('react-router');
import $ from 'jquery';


class Nav extends React.Component{
  constructor (props) {
    super(props);
    this.homePageClick = this.homePageClick.bind(this);
  }


  homePageClick() {
    window.location.href = "/"
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  render () {
    return (
      <div>
        <nav className="white">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center"><img style={{width:'50%',marginTop:'5px'}} src="https://assets.dice.com/external/images/empLogos/96125052f271581796a3f2a16c78d549.gif"/></a>
            <div className="sidenav" id="mySidenav">
              <ul>
                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
              </ul>
            </div>
            <ul id="nav-mobile" className="left">
              <li><a href="#" onClick={this.openNav} style={{color:'black'}}>New Placement</a></li>
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
