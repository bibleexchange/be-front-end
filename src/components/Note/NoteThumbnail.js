import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { withRouter, Link } from 'react-router-dom';
import TimeAgo from 'react-timeago'

class NoteThumbnail extends React.Component {

  render() {

   return (
  		<div onClick={this.props.selectNote}>
        <Link to={"/notes/"+this.props.note.id}>{this.props.note.title? this.props.note.title:"Note by "+this.props.note.author.name} (<TimeAgo date={this.props.note.created_at} />)</Link>
  		</div>
  		);
	                                                                                                    }
}

const FragmentContainer =  createFragmentContainer(NoteThumbnail, graphql`
  fragment NoteThumbnail_viewer on Viewer {
    authenticated
  }

  fragment NoteThumbnail_note on Note {
      id
      created_at
    title
    tags
      author{
        name
      }
    verse{
      id
      body
      reference
      url
      notesCount
      verseNumber
      quote
    }
  }

`)

export default withRouter(FragmentContainer);