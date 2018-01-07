import React from 'react'
import Course from './Course'
import { Link } from 'react-router-dom'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class CourseList extends React.Component {

  render () {
    return (
      <div className="carousel">
        <ul>
          {this.props.courses.edges.map(({node}) =>
            <li key={node.id} ><Course course={node} viewer={this.props.viewer} /></li>
          )}
          <li className="noBorder"><Link className="be-button" to={"/courses"}>more</Link></li>
        </ul>
      </div>
    )
  } 
}

export default createFragmentContainer(CourseList, graphql`
  fragment CourseList_viewer on Viewer {
    ...Course_viewer
  }

    fragment CourseList_courses on CourseConnection {
       edges {

        node {
          id
          title
          description
          ...Course_course
        }
      }
      }
`)