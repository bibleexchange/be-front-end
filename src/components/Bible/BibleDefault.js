import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import { withRouter } from 'react-router-dom';
import environment from '../../createRelayEnvironment'
import BibleWidget from './BibleWidget'
import Navbar from '../Navbar/Navbar'
import auth from '../../auth'
import MyNotes from '../MyNotes/MyNotes'
import LoginSignup from '../LoginSignup'

import './Bible.scss'

const BibleDefaultViewerQuery = graphql`
  query BibleDefaultViewerQuery ($token: String, $reference: String, $notesPageSize: Int!, $myNotesPageSize: Int!, $myNoteID: String, $crossReferencesPageSize: Int!) {
    viewer (token: $token){
      ...BibleWidget_viewer
      ...Navbar_viewer
      ...MyNotes_viewer
      authenticated

       bibleVerses (id:$reference){
          ...BibleWidget_verses
      }

      bibleVerse (id:$reference){
          ...BibleWidget_bibleVerse
          ...MyNotes_verse
      }

      userNotes(first:$myNotesPageSize) @connection(key: "MyNotes_userNotes", filters: []) {
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

class BibleDefault extends Component {

  componentWillMount(){

    let reference =  this.props.match.params.reference? this.props.match.params.reference.replace("_",' '):"John 1:1"
    reference = reference.charAt(0).toUpperCase() + reference.slice(1);

    this.state = {
      notesPageSize: 5,
      crossReferencesPageSize: 50,
      myNoteID: "",
      myNotesPageSize: 200,
      environment: environment,
      reference: reference
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.match.params.reference !== this.props.match.params.reference ){
      this.setState({reference: newProps.match.params.reference.charAt(0).toUpperCase() + newProps.match.params.reference.slice(1)})
    }
  }

  render() {

    return (
      <div>
        <QueryRenderer
          environment={this.state.environment}
          query={BibleDefaultViewerQuery}
          variables={{
            reference: this.state.reference,
            token: auth.getToken(),
            notesPageSize: this.state.notesPageSize,
            myNotesPageSize: this.state.myNotesPageSize,
            crossReferencesPageSize: this.state.crossReferencesPageSize,
            myNoteID: this.state.myNoteID
          }}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>
            } else if (props) {

              let takeNotesOrLogin = null

              if(props.viewer.authenticated){
                takeNotesOrLogin =  <MyNotes viewer={props.viewer} saveCallback={this.saveCallback.bind(this)} verse={props.viewer.bibleVerse} userNotes={props.viewer.userNotes} userNote={props.viewer.userNote} selectNote={this.handleSelectNote.bind(this)} />
              }else {
                takeNotesOrLogin = <LoginSignup loginCallback={this.loginCallback.bind(this)} signupCallback={this.signupCallback.bind(this)}/>
              }

              return <div id="bible">
                  <Navbar viewer={props.viewer} logOut={this.handleLogout.bind(this)}/>
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

                       {takeNotesOrLogin} 
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

  handleSelectNote(noteID){
    this.setState({myNoteID: noteID})
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
saveCallback(response){
      this.setState({
        environment: environment,
      })
  }

}

export default withRouter(BibleDefault)
