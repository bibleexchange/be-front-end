import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import { withRouter } from 'react-router-dom';
import environment from '../../createRelayEnvironment'
import BibleWidget from './BibleWidget'
import auth from '../../auth'
import Loader from '../App/Loader'

import './Bible.scss'

const BibleDefaultViewerQuery = graphql`
  query BibleDefaultViewerQuery ($token: String, $reference: String, $crossReferencesPageSize: Int!) {
    viewer (token: $token){
      ...BibleWidget_viewer
      ...Navbar_viewer
      authenticated

       bibleVerses (id:$reference){
          ...BibleWidget_verses
      }

    }
  }
`

class BibleDefault extends Component {

  componentWillMount(){

    this.state = {
      notesPageSize: 5,
      crossReferencesPageSize: 50,
      myNoteID: "",
      myNotesPageSize: 200,
      environment: environment
    }
  }

  render() {

    return (
      <div>
        <QueryRenderer
          environment={this.state.environment}
          query={BibleDefaultViewerQuery}
          variables={{
            reference: this.props.reference,
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

              return <div id="bible">
                  <div className="row">
                      <BibleWidget 
                        viewer={props.viewer} 
                        verses={props.viewer.bibleVerses} 
                        bibleVerse={props.viewer.bibleVerse} 
                        reference={props.reference}
                        options={{}}
                        />
                  </div>

                </div>

              
            }
            return <div><Loader /></div>
          }}
        />
      </div>
    )
  }

  loginCallback(response){
     /* this.setState({
        environment: environment,
      })*/
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

}

export default withRouter(BibleDefault)