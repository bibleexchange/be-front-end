import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from '../../createRelayEnvironment'
import { withRouter } from 'react-router-dom'
import NoteCreator from './NoteCreator'

const CreatePageViewerQuery = graphql`
  query CreatePageViewerQuery($verseID: String!) {
    viewer {
      ...NoteCreator_viewer
      id

      bibleVerse(id:$verseID){
        ...NoteCreator_bibleVerse
        id
        reference
        body
      }

    }
  }
`;

class CreatePage extends React.Component {

  render () {
    return (
      <QueryRenderer 
        environment={environment}
        variables={{
          verseID:this.props.match.params.verseID
        }}
        query={CreatePageViewerQuery}
        render={({error, props}) => {
          if (error) {
            return (
              <div>{error.message}</div>
            )
          } else if (props) {
            return (
              <NoteCreator viewer={props.viewer} bibleVerse={props.viewer.bibleVerse}/>
            )
          }
          return (<div>loading</div>)
        }}
      />
    )
  }

}

export default withRouter(CreatePage)