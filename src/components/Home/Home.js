import React, { Component } from 'react'
import {QueryRenderer, graphql} from 'react-relay'
import { withRouter } from 'react-router-dom';
import environment from '../../createRelayEnvironment'
import CourseList from './CourseList'
import Navbar from '../Navbar/Navbar'
import BibleWidget from '../Bible/BibleWidget'
import UserTrackList from './UserTrackList'
import auth from '../../auth'
import './Home.scss'
import LoginSignup from '../LoginSignup'

const HomeViewerQuery = graphql`
  query HomeViewerQuery ( $token: String!,$tracksPageSize: Int!, $coursesPageSize: Int!, $reference: String!, $crossReferencesPageSize: Int!){
    viewer (token: $token){
      ...CourseList_viewer
      ...Navbar_viewer
      ...BibleWidget_viewer
      ...UserTrackList_viewer

      id
      authenticated

       courses(first: $coursesPageSize, orderBy: "created_at:DESC", filter:"public:1") @connection(key: "CourseList_courses", filters: []) {
          ...CourseList_courses
          edges {
            node {
              id
            }
          }
        }

        userTracks(first: $tracksPageSize) @connection(key: "UserTrackList_userTracks", filters: []) {
          ...UserTrackList_userTracks
          edges {
            node {
              id
            }
          }
        }

      bibleVerses (id:$reference){
          ...BibleWidget_verses
      }

  }

}
`

class Home extends Component {

  componentWillMount(){
    this.state = {
      reference: localStorage.getItem("reference")? localStorage.getItem("reference"):"Mark 16:15",
      coursesPageSize: 5,
      notesPageSize: 5,
      tracksPageSize: 50,
      crossReferencesPageSize: 50,
      environment: environment
    }
  }

  componentWillReceiveProps(newProps){
    console.log(newProps)
  }

  render() {

    let tracks = null

    return (
      <div>
        <QueryRenderer
          environment={this.state.environment}
          query={HomeViewerQuery}
          variables={{
            coursesPageSize: this.state.coursesPageSize,
            reference: this.state.reference,
            notesPageSize: this.state.notesPageSize,
            crossReferencesPageSize: this.state.crossReferencesPageSize,
            tracksPageSize: this.state.tracksPageSize,
            token: auth.getToken()? auth.getToken():""
          }}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>
            } else if (props) {

              if(props.viewer.authenticated){
                tracks =  <UserTrackList viewer={props.viewer} userTracks={props.viewer.userTracks} />
              }else{
                tracks = <LoginSignup loginCallback={this.loginCallback.bind(this)} signupCallback={this.signupCallback.bind(this)}/>
              }
 
              return <div id="home">
                <Navbar viewer={props.viewer} logOut={this.handleLogout.bind(this)}/>

                {/*
                <div className="row">
                 {tracks}
                </div>
                <div className="row">
                <h2>Courses</h2>
                <CourseList viewer={props.viewer} courses={props.viewer.courses}/>
                </div>
                */}
                <div className="row">
                
                <BibleWidget 
                  viewer={props.viewer} 
                  verses={props.viewer.bibleVerses} 
                  bibleVerse={props.viewer.bibleVerse}
                  updateBibleReference={this.updateBibleReference.bind(this)} 
                  reference={this.state.reference}
                  moreNotes={this.moreNotes.bind(this)}
                  options={{}}
                  />

                </div>
                </div>
            }
            return <div>Loading</div>
          }}
        />
      </div>
    )
  }

  updateBibleReference(reference){
    this.props.history.push('/bible/' + reference)
  }

  moreNotes(){
    let newState = this.state
    newState.notesPageSize += 5
    this.setState(newState)
  }

  loginCallback(response){
      this.setState({
        environment: environment,
      })
  }

  signupCallback(response){
      this.setState({
        environment: environment,
      })
  }

  handleLogout(){
      this.setState({
        environment: environment,
      })
  }

}

export default withRouter(Home)
