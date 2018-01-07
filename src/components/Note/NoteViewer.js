import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import SimpleBibleVerse from '../Bible/SimpleBibleVerse'

import './Note.scss'

class NoteViewer extends React.Component {

  render() {

    let component = <h1>This note does not exist. Try <Link to={"/notes"}>searching</Link> for something else.</h1>;
    if (this.props.note !== null && this.props.note !== undefined && this.props.note !== '') {
      component = this.noteRender()
    }

    return (
          <div>{component}</div>
    );
  }

  noteRender(){

    return (

      <div id="note">
        <main dangerouslySetInnerHTML={{ __html: this.props.note.output.body }} />

        <aside>

        <h1>'{this.props.note.title}' Noted by {this.props.note.author.name}</h1>

        <h2>TEXT: <Link to={this.props.note.verse.url}>{this.props.note.verse.reference}</Link></h2>
        <SimpleBibleVerse viewer={this.props.viewer} verse={this.props.note.verse} />

        <h2>TAGS</h2>
        <p>{this.props.note.tags.map(function (t, key) {
          let x = null;
          if (t !== '') { x = <Link key={key} style={{ marginRight: '10px' }} to={'/notes/tag/' + t.trim()} >#{t}</Link>; }
          return x;
        })}</p>

        </aside>
      </div>

      );
  }

}

NoteViewer.propTypes = {
  note: React.PropTypes.object.isRequired,
};

const FragmentContainer =  createFragmentContainer(NoteViewer, graphql`
  fragment NoteViewer_viewer on Viewer {
    authenticated
    ...SimpleBibleVerse_viewer
  }

  fragment NoteViewer_note on Note {
      id
    title
    tags
      author{
        name
      }
    verse{
      ...SimpleBibleVerse_verse
      id
      body
      reference
      url
      notesCount
      verseNumber
      quote

    }
    output{
      body
    }
  }

`)

export default withRouter(FragmentContainer);