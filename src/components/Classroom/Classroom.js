import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../../createRelayEnvironment'
import auth from '../../auth'
import Navbar from '../Navbar/Navbar'
import RenderLesson from './RenderLesson'

class NotLoggedIn extends Component {
  render(){
    return (<div></div>);
  }
}

class NotStarted extends Component {
  render(){
    return <div>
            <Navbar viewer={this.props.viewer}/>
          <div>
              <h1>{this.props.viewer.userTrack.course.title}</h1>
              {this.createMarkup(this.props)}
              </div></div>
  }
}

class Continue extends Component {
  render(){
    
    let content = []
    let viewer = this.props.viewer

    return <div>
              <h1>{viewer.userTrack.course.title}</h1>
                <input onChange={this.getStep.bind(this)} value={this.state.step}/>
                <nav><button onClick={this.getPreviousStep.bind(this)}>previous</button><button onClick={this.getNextStep.bind(this)}>next</button></nav>

               <RenderLesson content={content} />

              })}

              </div>
  }

 getPreviousStep(){
    let newS = Object.assign({},this.state)
    newS.step -= 1
    this.setState(newS)
  }
  getNextStep(){
    let newS = Object.assign({},this.state)
    newS.step += 1
    this.setState(newS)
  }

    getStep(e){
      e.preventDefault()
    let newS = Object.assign({},this.state)
    newS.step = e.target.value
    this.setState(newS)
  }

}

const ClassroomViewerQuery = graphql`
  query ClassroomViewerQuery ($token: String!, $trackID: String!){
    viewer (token: $token){
      ...ActivityReadThis_viewer
      ...ActivityReadThisReference_viewer
      ...ActivityQuizThis_viewer
      ...Navbar_viewer
      authenticated
       userTrack(id: $trackID) {
          ...Download_track
          id
          course{
            id
            title
          }
          activity {
            id
            body
            order_by
            lesson {
              id
              title
              order_by
            }
          }
        }
      }
    }`

class Classroom extends Component {

  render() {

    let style = {
      maxWidth: "600px",
      marginLeft: "auto",
      marginRight: "auto"
    }

    return (
      <div>
        <QueryRenderer
          environment={environment}
          query={ClassroomViewerQuery}
          variables={{
            trackID:this.props.match.params.trackID,
            token: auth.getToken()
          }}
          render={({error, props}) => {

            if (error) {
              console.log(error)
              return <div>{error.message}</div>
            } else if (props === null) {
              return <div><Navbar viewer={null}/>Loading ...</div>
            }else{
              
              if(!props.viewer.authenticated){
                //NotLoggedIn
                return <div style={style}><NotLoggedIn viewer={props.viewer} props={props} /></div>
              }else if(false){
                //Continue
                return <div style={style}><Continue props={props}/></div>
              }else{
                //NotStarted
                return <div style={style}><NotStarted props={props} /></div>
              }

            }

            return <div>Loading</div>
          }}
        />
      </div>
    )
  }

}

export default Classroom