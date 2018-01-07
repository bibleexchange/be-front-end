import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter, Link } from 'react-router-dom';

class SimpleBibleVerse extends React.Component {
  render () {

    let reference = this.props.verse.verseNumber

    if(this.props.fullReference){
      reference = this.props.verse.reference
    }

    return (
      <div className="bible-verse">
          <Link to={"/bible/"+ this.props.verse.reference}>{reference}</Link> {this.props.verse.body}
      </div>
    )
  }
}

const FragmentContainer =  createFragmentContainer(SimpleBibleVerse, graphql`
  fragment SimpleBibleVerse_viewer on Viewer {
    id
    authenticated
  }

  fragment SimpleBibleVerse_verse on SimpleBibleVerse {
    id
    body
    verseNumber
    reference
  }

`)

export default withRouter(FragmentContainer);