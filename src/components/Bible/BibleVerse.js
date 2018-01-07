import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter, Link } from 'react-router-dom';

class BibleVerse extends React.Component {
  render () {

    let reference = this.props.verse.verseNumber

    if(this.props.fullReference){
      reference = this.props.verse.reference
    }

    let baseURL = this.props.baseURL? this.props.baseURL:"/bible/"

    return (
      <div className="bible-verse">
          <Link to={baseURL+ this.props.verse.reference}>{reference}</Link> {this.props.verse.body}
      </div>
    )
  }
}

const FragmentContainer =  createFragmentContainer(BibleVerse, graphql`
  fragment BibleVerse_viewer on Viewer {
    id
    authenticated
  }

  fragment BibleVerse_verse on BibleVerse {
    id
    body
    verseNumber
    reference
  }

`)

export default withRouter(FragmentContainer);