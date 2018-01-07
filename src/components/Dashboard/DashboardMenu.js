import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter, Link } from 'react-router-dom';

class DashboardMenu extends React.Component {

render (){

    return (
    	<nav id='dashboard-menu'>
			 <ul>
        {this.props.links.map(function(l, i){
          return <li key={i}><Link to={l.url}>{l.readable}</Link></li>
        })}
       </ul>
		  </nav>
    );
  }
}

const FragmentContainer =  createFragmentContainer(DashboardMenu, graphql`
  fragment DashboardMenu_viewer on Viewer {
  	authenticated
  	email
    name
  }
`)

export default withRouter(FragmentContainer);