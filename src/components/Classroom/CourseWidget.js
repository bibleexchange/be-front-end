import React from 'react'
import CourseBadge from './CourseBadge'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class CourseWidget extends React.Component {

  render () {
    return (
      <div className="carousel">
        <ul>
          {this.props.courses.edges.map(({node}) =>
            <li key={node.id} ><CourseBadge course={node} viewer={this.props.viewer} /></li>
          )}
        </ul>
      </div>
    )
  } 
}

export default createFragmentContainer(CourseWidget, graphql`
  fragment CourseWidget_viewer on Viewer {
    ...CourseBadge_viewer
  }

    fragment CourseWidget_courses on CourseConnection {
       edges {

        node {
          id
          title
          description
          ...CourseBadge_course
        }
      }
      }
`)