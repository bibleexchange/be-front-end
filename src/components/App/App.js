import React, { Component } from 'react'
import { graphql, QueryRenderer } from 'react-relay';
import { withRouter } from 'react-router-dom';
import environment from '../../createRelayEnvironment'
import BibleWidget from '../Bible/BibleWidget'
import Navbar from '../Navbar/Navbar'
import auth from '../../auth'
import MyNotes from '../MyNotes/MyNotes'
import LoginSignup from '../LoginSignup'
import SoundcloudSearch from '../App/SoundcloudSearch'
import NotesWidget from '../Note/NotesWidget'
import Loader from './Loader'
import BeLogo from '../Svg/BeLogo';

import './App.scss'

const AppViewerQuery = graphql`
  query AppViewerQuery ($token: String, $reference: String, $crossReferencesPageSize: Int!, $notesPageSize: Int!, $myNotesPageSize: Int!,$myNoteID: String) {
    viewer (token: $token){
      ...BibleWidget_viewer
      ...NotesWidget_viewer
      ...MyNotes_viewer
      ...Navbar_viewer
      authenticated

      bibleVerses (id:$reference){
      ...BibleWidget_verses
        edges {
          cursor
          node {
            id
          }
        }
      }

      bibleVerse (id:$reference){
      ...MyNotes_bibleVerse
      }

      notes(first:$notesPageSize, id:$reference){
      ...NotesWidget_notes
      }

      userNotes(first:$myNotesPageSize){
      ...MyNotes_userNotes
      }

      userNote(id:$myNoteID){
      ...MyNotes_userNote
      }

    }
  }
`

class App extends Component {

  componentWillMount(){

    let reference =  this.props.match.params.reference? this.props.match.params.reference.replace("_",' '):"John 1:1"
    reference = reference.charAt(0).toUpperCase() + reference.slice(1); 

    this.state = {
      environment: environment,
      reference: reference,
      crossReferencesPageSize: 50,
      notesPageSize: 5,
      myNoteID: this.props.match.params.noteID,
      myNotesPageSize: 200,
      filter: undefined,
      myNotesOpen: false
    }
  }

  componentWillReceiveProps(newProps){
    console.log(newProps.match.params.reference)
    if(newProps.match.params.reference !== this.props.match.params.reference && newProps.match.params.reference !== undefined){
      this.setState({reference: newProps.match.params.reference})
    }

    if(newProps.match.params.noteID !== this.props.match.params.noteID && newProps.match.params.noteID !== undefined){
      this.setState({myNoteID: newProps.match.params.noteID})
    }
  }

  componentDidUpdate(){
    window.scrollX = 1000

  }

  render() {

    return (
      <div>
        <QueryRenderer
          environment={this.state.environment}
          query={AppViewerQuery}
          variables={{
            token: auth.getToken(),
            reference: this.state.reference,
            crossReferencesPageSize: this.state.crossReferencesPageSize,
            notesPageSize: this.state.notesPageSize,
            myNoteID: this.state.myNoteID,
            myNotesPageSize: this.state.myNotesPageSize,
            filter: this.state.filter
          }}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>
            } else if (props) {
              console.log(props)
              let takeNotesOrLogin = null 

              if(props.viewer.authenticated){
                takeNotesOrLogin =  <MyNotes open={this.state.myNotesOpen} selectNote={this.updateNote.bind(this)} viewer={props.viewer} bibleVerse={props.viewer.bibleVerse} userNotes={props.viewer.userNotes} userNote={props.viewer.userNote}/>
              }else {
                takeNotesOrLogin = <LoginSignup loginCallback={this.loginCallback.bind(this)} signupCallback={this.signupCallback.bind(this)}/>
              }

              return <div id="app">
                  <Navbar viewer={props.viewer} search={this.state.reference} logOut={this.handleLogout.bind(this)} updateBibleReference={this.updateBibleReference.bind(this)}/>
                 <BeLogo style={{position:"fixed", bottom:0, float:"left", zIndex:"-1"}}/>
                  <div className="row">
                        
                    {this.renderBible(props)}

                    {/*<SoundcloudSearch query={this.state.reference} />*/}
                    <div>
                      {takeNotesOrLogin}
                      <NotesWidget viewer={props.viewer} 
                        notes={props.viewer.notes} 
                        moreNotes={this.moreNotes.bind(this)} 
                        />
                    </div>
                  </div>                      
                </div>
                    
              }

            return <div id="app">
                    <Navbar viewer={{}} search={""} logOut={this.handleLogout.bind(this)} updateBibleReference={this.updateBibleReference.bind(this)}/>
                    <BeLogo style={{position:"fixed", bottom:0, float:"left", zIndex:"-1"}}/>
                    <div className="row">
                      
                      <div><Loader /></div>
                      <div><Loader /></div>

                    </div>
                  </div>
          }}
        />
      </div>
    )
  }

  renderBible(props){

    if(props.viewer !== null && props.viewer.bibleVerses !== undefined && props.viewer.bibleVerses.edges !== undefined && props.viewer.bibleVerses.edges.length >= 1){
      return <div>
          <BibleWidget 
          viewer={props.viewer} 
          verses={props.viewer.bibleVerses} 
          bibleVerse={props.viewer.bibleVerse} 
          reference={props.reference}
          updateBibleReference={this.updateBibleReference.bind(this)}
          options={{}}
          />
      </div>

    }else{
      return null
    }

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

  updateBibleReference(reference){
    let note = ""

    if(this.state.myNoteID !== undefined){
      note = "/"+this.state.myNoteID
    }
    this.props.history.push('/bible/' + reference + note)
  }

updateNote(id){
  this.props.history.push('/bible/' + this.state.reference + "/" + id)
 }

  moreNotes(){
    let newState = this.state
    newState.notesPageSize += 5
    this.setState(newState)
  }

  toggleMyNotes(e){
    console.log("toggle my notes...")
    //this.setState({myNotesOpen: !this.state.myNotesOpen})
  }

}

export default withRouter(App)