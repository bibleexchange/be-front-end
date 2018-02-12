import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import {Link} from 'react-router-dom';
import environment from '../../createRelayEnvironment'
import Navbar from '../Navbar/Navbar'
import auth from '../../auth'
import './Note.scss'
import {translateNote} from './NoteUtil'
import BeLogo from '../Svg/BeLogo'

import NoteViewer from './NoteViewer';

const NotePageViewerQuery = graphql`
  query NotePageViewerQuery ( $token: String, $noteId: String!){
    viewer (token: $token){
      
      ...Navbar_viewer
      ...NoteViewer_viewer
      authenticated

      note (id:$noteId){
        id
        body
        ...NoteViewer_note
      }


  }
}
`

class NotePage extends Component {

  componentWillMount(){
    this.state = {
      lang: this.props.match.params.lang? this.props.match.params.lang:"eng"
    }
  }

  render() {

    let back = "/"

    if(this.props.match.params.back !== undefined){
      back = this.props.match.params.back
    }

    return (
      <div>
        <QueryRenderer
          environment={environment}
          query={NotePageViewerQuery}
          variables={{
            noteId: this.props.match.params.notedID,
            token: auth.getToken()
          }}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>
            } else if (props) {
              return <div id="home">
                <button onClick={this.goBack.bind(this)} className="be-button-back white" style={{width:"90%",margin:"auto auto", marginTop:"25px"}}>
                <BeLogo style={{width:"35px"}}/>
                </button>
                <BeLogo style={{position:"fixed", bottom:0, float:"left", zIndex:"-1"}}/>
                <div className="row">
                 <NoteViewer note={props.viewer.note} lang={this.state.lang} viewer={props.viewer} />
                </div>
                
              </div>
            }
            return <div>Loading</div>
          }}
        />
      </div>
    )
  }

  goBack(e){
    if(this.props.history.length >= 5){
      this.props.history.goBack()
    }else{
      this.props.history.push("/")
    }
    
  }

}

export default NotePage