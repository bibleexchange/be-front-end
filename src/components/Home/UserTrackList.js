import React from 'react'
import UserTrack from './UserTrack'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class UserTrackList extends React.Component {

  render () {

      let tracks = []

      if(this.props.userTracks !== null){
        tracks = this.props.userTracks.edges
      }

      return (
      <div className="carousel">
        <h2>Enrolled Courses</h2>
        <ul>
          {tracks.map(({node}) =>
            <li key={node.id} ><UserTrack userTrack={node} viewer={this.props.viewer} /></li>
          )}
        </ul>
      </div>
    )
    
  } 

}

export default createFragmentContainer(UserTrackList, graphql`
  fragment UserTrackList_viewer on Viewer {
  ...UserTrack_viewer
    authenticated
  }

    fragment UserTrackList_userTracks on TrackConnection {
       edges {

        node {
          id
          ...UserTrack_userTrack
        }
      }
      }
`)