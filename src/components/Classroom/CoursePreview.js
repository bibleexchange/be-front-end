import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../../createRelayEnvironment'
import auth from '../../auth'
import Navbar from '../Navbar/Navbar'
import Download from './Download'

class References extends Component {

  componentWillMount(){
    this.state = {
      counter: 10,
      total: this.props.references.length
    }
  }

  render() {
  
    let referenceStyle = {
      margin:"5px",
      padding:"10px",
      lineHeight:"20px",
      border:"solid 1px gray",
      display:"inline-block"
    }

    return <div>{this.props.references.slice(0,this.state.counter).map(function(r,i){
                      return <Link key={i} to={"/bible/"+r} style={referenceStyle}>{r} | </Link>;
            })}{this.manyLeft()}</div>
  }

  loadMore(e){
    e.preventDefault();
    let newState = this.state
    newState.counter += 10
    this.setState(newState)
  }

  getAll(e){
    e.preventDefault();
    let newState = this.state
    newState.counter = newState.total
    this.setState(newState)
  }

  minimize(e){
    e.preventDefault();
    let newState = this.state
    newState.counter = 10
    this.setState(newState)
  }

  manyLeft(){
    let left = this.state.total-this.state.counter

    if(left <= 0){
      return <button onClick={this.minimize.bind(this)}>minimize</button>
    }else{
      return <div><button onClick={this.loadMore.bind(this)}>Load 10 More ({left})</button><button onClick={this.getAll.bind(this)}>get all</button></div>
    }
    
  }

}

const CoursePreviewViewerQuery = graphql`
  query CoursePreviewViewerQuery ($token: String!, $courseID: String!){
    viewer (token: $token){ 
      ...ActivityQuizThis_viewer  
      ...Navbar_viewer
      ...Download_viewer
       course(id: $courseID) {
            id
            textbook
          }

       userTrack(id: $courseID) {
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
    }
`

class CoursePreview extends Component {

  constructor(){
    super()
    this.state = {
      section: 0,
      step: 0
    }
  }

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
          query={CoursePreviewViewerQuery}
          variables={{
            courseID:this.props.match.params.courseID,
            token: auth.getToken()? auth.getToken():""
          }}
          render={({error, props}) => {
            if (error) {
              console.log(error)
              return <div>{error.message}</div>
            } else if (props) {
              let tb  = JSON.parse(props.viewer.course.textbook)
              
              return <div>
                <Navbar viewer={props.viewer}/>

                <div style={style}>                 
                  
                  <nav>
                    <li><Download textbook={tb} viewer={props.viewer} track={props.trac}/></li>
                    <li></li>
                  </nav>

                  <h1>{tb.meta.title}</h1>

                  <span dangerouslySetInnerHTML={{__html:tb.meta.image }} />

                  <h2>Description: </h2>
                  <p>{tb.meta.description}</p>

                  <h2>Sections: </h2>
                  <ol>
                  {tb.sections.map(function(section){
                    return <li key={section.id}>{section.title} ({section.steps.length} lessons)</li>
                  })}
                  </ol>

                  <h2>Scripture Information</h2>

                  <ul>
                    <li>Main Text: {tb.scripture.main}</li>
                    <li>Scripture References Count: {tb.scripture.scripturesCount}</li>
                    <li>Scripture References: <References references={tb.scripture.references} /></li>
                    <li></li>
                  </ul>

                  <h2>Document Properties</h2>

                  <li>Created: {tb.meta.created}</li>
                  <li>Last Updated: {tb.meta.updated}</li>

                  <li>Editors: 
                  {tb.meta.editors.map(function(e,i){
                    return <span key={i}>{e} | </span>
                  })}</li>
                  

                  <li>Length: {tb.meta.length}</li>
                  <li>Words Count: {tb.meta.wordsCount}</li>

                  <li>Key Words: {tb.meta.keyWords.map(function(w,i){
                    return <span key={i}>{w.word} ({w.count} x's) | </span>
                  })}</li>


                  <li>Tags: 
                  {tb.meta.tags.map(function(e,i){
                    return <span key={i}>{e} | </span>
                  })}
                  </li>

                  <ul>Errors: 
                  {tb.meta.errors.map(function(e,i){
                    return <li key={i}>{e}</li>
                  })}
                  </ul>

                  

                </div>
              </div>
            }
            return <div>Loading</div>
          }}
        />
      </div>
    )
  }

}

export default CoursePreview