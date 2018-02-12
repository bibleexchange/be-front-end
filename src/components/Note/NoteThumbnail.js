import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { withRouter, Link } from 'react-router-dom';
import TimeAgo from 'react-timeago'
import {configure, gravatarHash} from './NoteUtil'
import './NoteThumbnail.scss'

class NoteThumbnail extends React.Component {

  render() {

    let config = configure(this.props.note)

   return (
  		<div className="note-thumbnail" >
            <img className="avatar" src={"https://www.gravatar.com/avatar/"+gravatarHash(this.props.note.author.email)} />
            <span className="name">{this.props.note.author.name}</span> (<span className="time"><TimeAgo date={this.props.note.created_at} /></span>)
            <Link to={"/notes/"+this.props.note.id}><p>{config.get("title")}</p></Link>
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
    body
    tags
      author{
        name
        email
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