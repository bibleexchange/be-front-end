import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../../createRelayEnvironment'
import BibleWidget from './BibleWidget'
import auth from '../../auth'

import './Bible.scss'

const EmbedBibleViewerQuery = graphql`
  query EmbedBibleViewerQuery ($token: String, $reference: String, $notesPageSize: Int!, $myNotesPageSize: Int!, $myNoteID: String, $crossReferencesPageSize: Int!) {
    viewer (token: $token){
      ...BibleWidget_viewer
      ...MyNotes_viewer
      authenticated

       bibleVerses (id:$reference){
          ...BibleWidget_verses
      }

      bibleVerse (id:$reference){
          ...BibleWidget_bibleVerse
          ...MyNotes_verse
      }

      userNotes(first:$myNotesPageSize) @connection(key: "MyNotes_userNotes") {
        edges {
          node {
            id
          }
        }
        ...MyNotes_userNotes
      }

      userNote(id:$myNoteID){
        ...MyNotes_userNote
      }

    }
  }
`

class EmbedBible extends Component {

  componentWillMount(){
    this.state = {
      crossReferencesPageSize: 0,
      environment: environment,
      reference: this.cleanReference(this.props.match.params.reference),
      notesPageSize: 0,
      myNoteID: "",
      myNotesPageSize: 0,
      options : {simple:true, baseURL:"/embed/bible/"}
    }
  }

  componentWillReceiveProps(newProps){
    let reference =  this.cleanReference(newProps.match.params.reference)
    if(reference !== this.state.reference){
      this.setState({reference: reference})
    }
  }

  render() {

    return (
      <div>
        <QueryRenderer
          environment={this.state.environment}
          query={EmbedBibleViewerQuery}
          variables={{
            reference: this.state.reference,
            token: auth.getToken(),
            crossReferencesPageSize: this.state.crossReferencesPageSize,
            notesPageSize: this.state.notesPageSize,
            myNotesPageSize: this.state.myNotesPageSize
          }}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>
            } else if (props) {

              return <div id="bible">
                  <div className="row">
                      <BibleWidget 
                        viewer={props.viewer} 
                        verses={props.viewer.bibleVerses} 
                        bibleVerse={props.viewer.bibleVerse}
                        updateBibleReference={this.updateBibleReference.bind(this)} 
                        reference={this.state.reference}
                        moreNotes={false}
                        options={this.state.options}
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
    this.props.history.push(this.state.options.baseURL + reference)
  }

  cleanReference(reference){
    let ref = reference? reference.replace("_",' '):"John 1:1"
    return ref.charAt(0).toUpperCase() + ref.slice(1);
  }

}

export default EmbedBible
