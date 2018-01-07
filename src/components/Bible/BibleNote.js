import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter } from 'react-router-dom';
import NoteThumbnail from '../Note/NoteThumbnail'

class BibleNote extends React.Component {

  render () {
    return (
      <div>
        <NoteThumbnail note={this.props.note} viewer={this.props.viewer} handleSelect={this._handleSelectNote.bind(this)}/>
      </div>
    )
  }

  _handleSelectNote = (e)=> {
    this.props.selectNote(e)
  }
}

const FragmentContainer =  createFragmentContainer(BibleNote, graphql`
  fragment BibleNote_viewer on Viewer {
    ...NoteThumbnail_viewer
    id
  }
  fragment BibleNote_note on Note {
    ...NoteThumbnail_note
      id
  }
`)

export default withRouter(FragmentContainer);