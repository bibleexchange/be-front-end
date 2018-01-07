import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import { Link } from 'react-router-dom';
import NotesWidget from './NotesWidget';

class NotesIndex extends React.Component {

  componentWillMount(){
    this.props.handleUpdateNoteFilter(this.props.params.filter)
  }

  render() {
    return (
      	<div className='WidgetContainer'>
              <div className='Widget'>
                <NotesWidget
                  filter={this.props.params.filter}
                  notes={this.props.notes}
                  selectNote={this.props.handleEditThisNote}
                  tags
                  handleUpdateNoteFilter={this.props.handleUpdateNoteFilter}
                  handleNextNotePage={this.props.handleNextNotePage}
                  status={this.props.notesWidget}
                  handleNotesAreReady={this.props.handleNotesAreReady}
                  user={this.props.user}
                  />
              </div>
       	</div>
    );
  }

}

NotesIndex.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

const FragmentContainer =  createFragmentContainer(NotesIndex, graphql`
  fragment NotesIndex_viewer on Viewer {
    user {
       ...NotesWidget_user
    }

  }

  fragment NotesIndex_notes on NoteConnection {
     ...NotesWidget_notes
  }

`)

export default withRouter(FragmentContainer);