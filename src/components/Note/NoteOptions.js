import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { Link } from 'react-router-dom';

import SocialShareButton from '../SocialMedia/SocialShareButton';

import './NoteOptions.scss';

const shareIcon = require('../../assets/svg/share.svg');

class NoteOptions extends React.Component {

  render() {
    let shareURL = this.props.location.pathname.replace('/','');
    let printNote = null

    if (this.props.note !== undefined && this.props.note !== null && this.props.user !== undefined) {
      printNote = <li><SocialShareButton site='print' url={'/notes/' + this.props.note.id + '/print'} /></li>
    }

  	 return (
  		<nav id='note-options-menu' >
        <ul className="note-options">
          {printNote}
          <li><SocialShareButton site='facebook' url={shareURL} /></li>
          <li><SocialShareButton site='twitter' message={'Discover https://bible.exchange/'+shareURL+' and more on Bible.exchange.'} url={shareURL} /></li>
          <li><SocialShareButton site='googleplus' url={shareURL} /></li>
          <li><SocialShareButton site='pinterest' media='https://bible.exchange/be_logo.png' message={'Discover https://bible.exchange/'+shareURL+' and more on Bible.exchange.'} url={shareURL} /></li>
        </ul>

  		</nav>
  		);
	  }
}

const FragmentContainer =  createFragmentContainer(NoteOptions, graphql`
  fragment NoteOptions_viewer on Viewer {
    id
    authenticated
  }

  fragment NoteOptions_note on Note {
        id
        title
        verse{
          id
          url
          reference
        }
        output {
          id
          body
        }
        author {
          id
          name
        }
  }

`)

export default withRouter(FragmentContainer);