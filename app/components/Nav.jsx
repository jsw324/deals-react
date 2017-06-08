const React = require('react');
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
var { Link } = require('react-router');
const actions = require('actions');


class Nav extends React.Component{
  constructor (props) {
    super(props);
    this.getPhoto = this.getPhoto.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    //jquery to allow closing of sideNav by clicking anywhere on page.
    $('body').click(function(e) {
      document.getElementById("mySidenav").style.width = "0";
    })
  }

  onLogout(e) {
		e.preventDefault();
		var { dispatch } = this.props;
		dispatch(actions.startLogout());
	}

  openNav() {
    console.log('window size', window.innerWidth);
    if (window.innerWidth <= 800) {
      document.getElementById("mySidenav").style.width = "40%";
    } else {
    document.getElementById("mySidenav").style.width = "25%";
    }
  };

  /* Set the width of the side navigation to 0 */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  getPhoto() {
    var { auth } = this.props;
    if (auth.name) {
      var photoURL = auth.photo;
      var userName = auth.name;
      return (
        <div>
          <div className="account__container valign-wrapper"><img src={photoURL} className="account__image responsive-img"/></div>
          <label className="name__text">Welcome, {userName}</label>
          <ul>
            <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
            <Link className="flow-text" to="/dashboard">My Dashboard</Link>
            <Link to="#" className="flow-text">My Commission</Link>
            <a href="#" className="flow-text">PTO Requests</a>
            <a onClick={this.onLogout} className="flow-text">Logout</a>
          </ul>
        </div>
      )
    } else {
      return (
        <ul>
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
          <li className="center-align">Please sign in.</li>
        </ul>
      )
    }
  }

  render () {

    return (
      <div>
        <nav className="white">
          <div className="nav-wrapper">
            <a className="brand-logo center"><img style={{width:'50%',marginTop:'5px'}} src="https://assets.dice.com/external/images/empLogos/96125052f271581796a3f2a16c78d549.gif"/></a>
            <div className="sidenav" id="mySidenav">
            {this.getPhoto()}
              
            </div>
            <ul id="nav-mobile" className="left">
              <li><a onClick={this.openNav} style={{color:'black'}}><i className="fa fa-bars fa-lg" aria-hidden="true"></i></a></li>
            </ul>
          </div>
        </nav>
      </div>
      )
  }
};

export default connect()(Nav);
