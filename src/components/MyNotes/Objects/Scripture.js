import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../../../createRelayEnvironment'
import BibleWidget from '../../Bible/BibleWidget'
import auth from '../../../auth'

import '../../Bible/Bible.scss'

const ScriptureViewerQuery = graphql`
  query ScriptureViewerQuery ($token: String, $reference: String, $crossReferencesPageSize: Int!, $notesPageSize: Int!) {
    viewer (token: $token){
      ...BibleWidget_viewer

       bibleVerses (id:$reference){
          ...BibleWidget_verses
      }

      bibleVerse (id:$reference){
          ...BibleWidget_bibleVerse
      }

    }
  }
`

class Scripture extends Component {

  componentWillMount(){
    this.state = {
      notesPageSize: 5,
      crossReferencesPageSize: 50,
      myNoteID: "",
      myNotesPageSize: 200,
      environment: environment,
      edit: true
    }
  }

  render() {

    return (
      <div>
        <QueryRenderer
          environment={this.state.environment}
          query={ScriptureViewerQuery}
          variables={{
            reference: this.props.data.value.reference,
            token: auth.getToken(),
            crossReferencesPageSize: this.state.crossReferencesPageSize,
            notesPageSize: this.state.notesPageSize
          }}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>
            } else if (props) {

              if(this.state.edit){
                return <div>
                    <button className="big" onClick={this.toggleView.bind(this)}>preview</button>
                    <label>scripture: </label>
                    <input name="scripture" type="text" value={this.props.data.value.reference} onChange={this.updateComponentReference.bind(this)} />
                    </div>
              }else{
                return  <div>
                  <button className="big" onClick={this.toggleView.bind(this)}>edit</button>
                    <div id="bible">
                          <BibleWidget 
                            viewer={props.viewer} 
                            verses={props.viewer.bibleVerses} 
                            bibleVerse={props.viewer.bibleVerse}
                            updateBibleReference={this.updateBibleReference.bind(this)} 
                            reference={this.props.data.value.reference}
                            moreNotes={this.moreNotes.bind(this)}
                            simple={true}
                            />
                    </div>

                  </div>
              }
              
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

  updateComponentReference(e){
    let newValue = this.props.data.value
    newValue.reference = e.target.value
    this.props.updateValueOfComponent(this.props.unitIndex, this.props.index, newValue)
  }

  toggleView(){
    this.setState({edit: !this.state.edit})
  }

}

export default Scripture
