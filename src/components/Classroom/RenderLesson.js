import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'
import { withRouter } from 'react-router-dom';
import ActivityReadThis from './ActivityReadThis'
import ActivityReadThisReference from './ActivityReadThisReference'
import ActivityQuizThis from './ActivityQuizThis'
import md from '../../Markdown'

class RenderLesson extends React.Component {

  render () {

    let that = this
    let content = this.props.content.split("\n")

    return (
      <div>
        {content.map(function(l,i){

                    if(l.substring(0,6) === "<!-- {"){
                      let ob = JSON.parse(l.replace("<!-- ","").replace("-->",""));
                      return <div key={i} >{that.processObject(ob, that.props.viewer)}</div>
                    }else{
                      return <div key={i} dangerouslySetInnerHTML={{__html: l }}  />
                    }
        })}
      </div>
    )
  } 

   processObject(ob,viewer){

   switch(ob.type){
    case "markdown":
      return <div dangerouslySetInnerHTML={{__html: md.render(ob.content) }} />
    case "quiz":
      return <ActivityQuizThis questions={ob.content.questions} title={ob.content.title} viewer={viewer}/>
    default:
      return <div>{ob.content}</div>
   }

  }

    createMarkup(props) { 

    if(props.viewer.userTrack.activity === null){
      return <h1>the end</h1>
    }else{
      let body = JSON.parse(props.viewer.userTrack.activity.body)

     switch(body.template){

          case "READ_THIS":
            return <ActivityReadThis track={props.viewer.userTrack} viewer={props.viewer}/>

          case "READ_THIS_REFERENCE":
            return <ActivityReadThisReference track={props.viewer.userTrack} viewer={props.viewer}/>

         case "QUIZ_THIS":
            return <ActivityQuizThis track={props.viewer.userTrack} viewer={props.viewer}/>

          default:
            console.log(props.viewer)
            return body.props

        }
      
    }

   

  }
}


const FragmentContainer =  createFragmentContainer(RenderLesson, graphql`
  fragment RenderLesson_viewer on Viewer {
    ...ActivityReadThis_viewer
    ...ActivityReadThisReference_viewer
    ...ActivityQuizThis_viewer
    id
    authenticated
  }

  fragment RenderLesson_track on Track {
    ...ActivityReadThis_track
    ...ActivityReadThisReference_track
    ...ActivityQuizThis_track

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
`)

export default withRouter(FragmentContainer);