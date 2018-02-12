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
  query ScriptureViewerQuery ($token: String, $reference: String, $crossReferencesPageSize: Int!) {
    viewer (token: $token){
      ...BibleWidget_viewer

       bibleVerses (id:$reference){
          ...BibleWidget_verses
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
      options: {
        simple: true
      },
      reference: this.props.value
    }
  }

  componentWillUpdate(newProps){
    //console.log(newProps))
  }

  render() {
    return (
      <div>
        <QueryRenderer
          environment={this.state.environment}
          query={ScriptureViewerQuery}
          variables={{
            reference: this.state.reference,
            token: auth.getToken(),
            crossReferencesPageSize: this.state.crossReferencesPageSize,
            notesPageSize: this.state.notesPageSize
          }}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>
            } else if (props && typeof this.state.reference !== "object") {

                return  <div style={props.style}>
                    <div id="bible">
                          <BibleWidget 
                            viewer={props.viewer} 
                            verses={props.viewer.bibleVerses} 
                            bibleVerse={props.viewer.bibleVerse}
                            updateBibleReference={this.updateBibleReference.bind(this)} 
                            reference={this.state.reference}
                            options={this.state.options}
                            moreNotes={this.moreNotes.bind(this)}
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

  updateBibleReference(e){
      this.setState({reference: e.target.dataset.reference})    
  }

  moreNotes(e){
    console.log("more notes function not created")
  }

  updateComponentReference(e){
    let newValue = this.props.data.value
    newValue.reference = e.target.value
    this.props.updateValueOfComponent(this.props.unitIndex, this.props.index, newValue)
  }

}

export default Scripture
