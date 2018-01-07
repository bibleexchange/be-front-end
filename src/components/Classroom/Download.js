import React, { Component } from 'react'
import {createFragmentContainer, graphql} from 'react-relay'
import RenderLesson from './RenderLesson'
import { withRouter } from 'react-router-dom';


class Download extends Component {

  componentWillMount(){

    this.state = {
      print: false,
    }
  }

  render() {

    let style ={
      position:"absolute",
      width:"100%",
      maxWidth:"2000px",
      zIndex:"11111",
      top:"0",
      left:"0",
      backgroundColor:"white"
    }

    let that = this

    if(this.state.print){
      return <div style={style}>
      <button onClick={this.togglePrint.bind(this)}>close</button>

      <h1>{this.props.textbook.meta.title}</h1>

      <p>Editors: {this.props.textbook.meta.editors.map(function(e,i){
                    return <span key={i}> | {e}</span>
                  })}</p>

      <p>{this.props.textbook.meta.description}</p>

            {this.props.textbook.sections.map(function(sec){

                return <div key={sec.id}><h2 style={{fontWeight:"bold", textDecoration:"underline",fontSize:"32px"}}>SECTION {sec.id+1}:{sec.title}</h2>

                {sec.steps.map(function(step){
                    if(step !== 'null' && step !== 'null'){
                      return <div key={step.id}><p style={{fontWeight:"bold"}}>(SECTION #{sec.id+1 } > LESSON #{step.id+1})</p> <RenderLesson content={step.content} viewer={that.props.viewer}/></div>
                    }else{
                      console.log("error", step)
                      return null
                    }
                })}</div>

            })}

    </div>
    }else{
      return <div><button onClick={this.togglePrint.bind(this)}>print</button></div>
    }

    
  }

  togglePrint(e){
    this.setState({print: !this.state.print})
  }

}

const FragmentContainer =  createFragmentContainer(Download, graphql`
  fragment Download_viewer on Viewer {
    ...RenderLesson_viewer
    id
    authenticated
  }

  fragment Download_track on Track {
    id
    ...RenderLesson_track
  }
`)

export default withRouter(FragmentContainer);