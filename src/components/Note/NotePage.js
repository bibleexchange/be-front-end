import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../../createRelayEnvironment'
import Navbar from '../Navbar/Navbar'
import auth from '../../auth'
import './Note.scss'

import NoteViewer from './NoteViewer';

const NotePageViewerQuery = graphql`
  query NotePageViewerQuery ( $token: String, $noteId: String!){
    viewer (token: $token){
      
      ...Navbar_viewer
      ...NoteViewer_viewer
      authenticated

      note (id:$noteId){
        id
        ...NoteViewer_note
      }


  }
}
`

class NotePage extends Component {

  render() {

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
                <Navbar viewer={props.viewer}/>

                <div className="row">
                 <NoteViewer note={props.viewer.note} viewer={props.viewer} />
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

export default NotePage