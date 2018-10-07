import React, {Component} from 'react';
class NavBar extends Component {
 render() {
   return (
     <nav className='navbar'>
	   <a href='/' className='navbar-brand'>Jatti</a>
	   <span className="usersOnline">{this.props.count} user(s) online</span>
	 </nav>
   );
 }
}
export default NavBar;