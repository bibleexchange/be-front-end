import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import CreateStatementMutation from '../../mutations/CreateStatementMutation';
import { withRouter } from 'react-router-dom';

import BibleChapter from './BibleChapter'

class ActivityReadThisReference extends React.Component {

  render () {

    let p = JSON.parse(this.props.track.activity.body).props

    return (
      <div>          
          <BibleChapter reference={p.reference} verses={p.verses}/>

          <button onClick={this._iReadThis.bind(this)}>Next</button>

      </div>
    )
  }

  _iReadThis = () => {
    console.log(this.props)
    CreateStatementMutation(this.props.track.id, this.props.track.activity.id, "PASSED",this.props.viewer.id, this._statementWasMade.bind(this))
  }

    _statementWasMade = () => {
    console.log("statement was made successfully from ActivityReadThis line 27.")
  }
}

const FragmentContainer =  createFragmentContainer(ActivityReadThisReference, graphql`
  fragment ActivityReadThisReference_viewer on Viewer {
    id
  }
  fragment ActivityReadThisReference_track on Track {
    id
    activity {
      id
      body
    }
  }
`)

export default withRouter(FragmentContainer);