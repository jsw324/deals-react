const React = require('react');
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
var {Link, IndexLink} = require('react-router');
import $ from 'jquery';
import firebase from 'firebase';
const actions = require('actions');


class Nav extends React.Component{
  constructor (props) {
    super(props);
    this.homePageClick = this.homePageClick.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    $('body').click(function(e) {
      document.getElementById("mySidenav").style.width = "0";
    })
  }

  onLogout(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		dispatch(actions.startLogout());
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

  getPhoto() {
    if (firebase.auth().currentUser) {
      var photoURL = firebase.auth().currentUser.photoURL;
      var userName = firebase.auth().currentUser.displayName;
      return (
        <div>
          <div className="account__container valign-wrapper"><img src={photoURL} className="account__image responsive-img"/></div>
          <label className="name__text">Welcome, {userName}</label>
          <ul>
            <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
            <Link to="/get-perm">My Dashboard</Link>
            <Link to="/admin">My Commission</Link>
            <a href="#">PTO Requests</a>
            <a onClick={this.onLogout}>Logout</a>
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
            <a href="/" className="brand-logo center"><img style={{width:'50%',marginTop:'5px'}} src="https://assets.dice.com/external/images/empLogos/96125052f271581796a3f2a16c78d549.gif"/></a>
            <div className="sidenav" id="mySidenav">
            {this.getPhoto()}
              
            </div>
            <ul id="nav-mobile" className="left">
              <li><a href="#" onClick={this.openNav} style={{color:'black'}}><i className="fa fa-bars fa-lg" aria-hidden="true"></i></a></li>
            </ul>
          </div>
        </nav>
      </div>
      )
  }
};

export default connect()(Nav);
