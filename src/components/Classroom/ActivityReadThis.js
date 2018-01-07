import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import CreateStatementMutation from '../../mutations/CreateStatementMutation';
import { withRouter } from 'react-router-dom';

class ActivityReadThis extends React.Component {

  render () {
    return (
      <div>          
          <div dangerouslySetInnerHTML={{__html: this._createMarkup(this.props.track)}} />

          <button onClick={this._iReadThis.bind(this)}>Next</button>

      </div>
    )
  }

  _createMarkup = (track) => {
    return JSON.parse(track.activity.body).props
  }

  _iReadThis = () => {
    CreateStatementMutation(this.props.track.id, this.props.track.activity.id, "PASSED",this.props.viewer.id, this._statementWasMade.bind(this))
  }

    _statementWasMade = () => {
    console.log("statement was made successfully from ActivityReadThis line 27.")
  }
}

const FragmentContainer =  createFragmentContainer(ActivityReadThis, graphql`
  fragment ActivityReadThis_viewer on Viewer {
    id
  }
  fragment ActivityReadThis_track on Track {
    id
    activity {
      id
      body
    }
  }
`)

export default withRouter(FragmentContainer);