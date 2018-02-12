import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter, Link } from 'react-router-dom';
import auth from '../../auth'
import './Navbar.scss';
import BeLogo from '../Svg/BeLogo';
import BibleNavigation from '../Bible/BibleNavigation'
import {gravatarHash} from '../Note/NoteUtil'

class Navbar extends React.Component {

shouldComponentUpdate(newProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
    return this.props.viewer.authenticated !== newProps.viewer.authenticated;
  }

render (){

    let loggedIn = this.props.viewer?this.props.viewer.authenticated:false
    let logout = null

    if(loggedIn){
      logout = <nav id='UserNav'>
        <li style={{height: "100%", lineHeight:"50px"}}><Link to={"/me/editor"}>
        	<img style={{height: "100%", lineHeight:"50px"}} src={"https://www.gravatar.com/avatar/"+gravatarHash(this.props.viewer.email)} />
        </Link></li>
        <li style={{height: "50px", lineHeight:"50px", display:"inline-block", float:"right"}}><a onClick={this.logout}>(log out)</a></li>
        </nav>
    }
    
    return (
    	<header id='MainNavbar'>
			<nav id='BrandNav'>
			
			<Link to='/'>
			<BeLogo styleName="main"/><span className='brandName'>Bible exchange</span>
			
			</Link>

            <BibleNavigation
       reference={this.props.search}
       updateReference={this.props.updateBibleReference}
      />
      
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