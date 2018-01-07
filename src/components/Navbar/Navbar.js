import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter, Link } from 'react-router-dom';
import auth from '../../auth'
import './Navbar.scss';
import BeLogo from '../Svg/BeLogo';
//<sup className='beta'>beta 3.0</sup>
class Navbar extends React.Component {

render (){

    let loggedIn = this.props.viewer?this.props.viewer.authenticated:false
    let logout = null

    if(loggedIn){
      logout = <nav id='UserNav'>
        <li style={{height: "100%", lineHeight:"50px"}}><Link to={"/me/editor"}>{this.props.viewer.name}</Link></li>
        <li style={{height: "100%", lineHeight:"50px"}}><button onClick={this.logout}>(log out)</button></li>
        </nav>
    }
    
    return (
    	<header id='MainNavbar'>
			<nav id='BrandNav'>
			
			<Link to='/'>
			<BeLogo styleName="main"/><span className='brandName'>Bible exchange</span>
			
			</Link>
			
			</nav>
			
			 {logout}
			
		 </header>
    );
  }

 logout = ()=> {
  auth.logout()
  this.props.logOut()
 }

}

const FragmentContainer =  createFragmentContainer(Navbar, graphql`
  fragment Navbar_viewer on Viewer {
  	authenticated
  	email
    name
  }
`)

export default withRouter(FragmentContainer);