import React from "react"
import {
  createFragmentContainer,
  graphql
} from "react-relay"
import { withRouter, Link } from "react-router-dom"

class UserTrack extends React.Component {

  render () {
    return (
      <div id="user-track">
        <h2>{this.props.userTrack.course.title}</h2>
        <Link className="be-button" to={"/classroom/" + this.props.userTrack.id + "?title="+ this.props.userTrack.course.title}>continue</Link>

      </div>
    )
  }

  _handleDelete(){
    //DeleteNoteMutation(this.props.note.id, this.props.viewer.id)
  }
}

const FragmentContainer =  createFragmentContainer(UserTrack, graphql`
  fragment UserTrack_viewer on Viewer {
    id
  }
  fragment UserTrack_userTrack on Track {
     id
     course {
      id
      title
     }
  }
`)

export default withRouter(FragmentContainer);