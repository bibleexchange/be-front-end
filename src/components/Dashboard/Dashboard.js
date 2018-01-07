import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../../createRelayEnvironment'
import auth from '../../auth'
import './Dashboard.scss'
import Navbar from '../Navbar/Navbar'
import DashboardMenu from './DashboardMenu'
import LoginSignup from '../LoginSignup'
const DashboardViewerQuery = graphql`
  query DashboardViewerQuery ($token: String){
    viewer (token: $token){
      ...Navbar_viewer
      ...DashboardMenu_viewer
      id
      authenticated
      name
      email
      verified
    }
  }
`

class Dashboard extends Component {

  componentWillMount(){
    this.state = {
      links : [
          {readable:"My Enrolled Courses", url:"/me/tracks"},
          {readable:"My Notes", url:"/me/notes"},
          {readable:"My Courses", url:"/me/editor"},
          {readable:"My Bible Experience", url:"/me/experience"},
          {readable:"My Settings", url:"/me/settings"}
        ],
      environment: environment
    }
  }

  render() {

    return (
      <div>
        <QueryRenderer
          environment={this.state.environment}
          query={DashboardViewerQuery}
          variables={{
            token: auth.getToken()
          }}
          render={({error, props}) => {

            if (error) {
              console.log(error)
              return <div>{error.message}</div>
            } else if (props === null) {
              return <div><Navbar viewer={null}/></div>
            }else if (props !== null && props.viewer !== null) {
              return <div>
                        <Navbar viewer={props.viewer} logOut={this.handleLogout.bind(this)}/>
                          {this._handleMain(props)}
                      </div>
            }

            return <div>Loading</div>
          }}
        />
      </div>
    )
  }

  _handleMain(props){

    let body = null

    if(props.viewer.authenticated){
        let main = null
    switch(this.props.match.section){

      case 'tracks':
        main = <h1>{props.viewer.name} Tracks</h1>
        break
      case 'experience':
        main = <h1>{props.viewer.name} Experience</h1>
        break
      default:
        let verify = null

        if (props.viewer.verified !== "yes"){
          verify = <p style={{color:"red"}}>Please check your inbox and confirm your email address!</p>
        }
        main = <div><h1>{props.viewer.name}</h1>{verify}</div>
    }

    body = <div id="dashboard"><aside><DashboardMenu viewer={props.viewer} links={this.state.links} /></aside><main>{main}</main></div>

    }else {
      body =  <div id="dashboard"><LoginSignup loginCallback={this.loginCallback.bind(this)} signupCallback={this.signupCallback.bind(this)}/></div>
    }

    return body

  }

  loginCallback = (response) => {    
      this.setState({
        environment: environment
      })

  }

    signupCallback = (response) => {    
      this.setState({
        environment: environment
      })

  }

  handleLogout = () => {this.setState({environment: environment})}

}

export default Dashboard