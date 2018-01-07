import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../../createRelayEnvironment'
import CourseWidget from './CourseWidget'
import Navbar from '../Navbar/Navbar'
import './Course.scss'

const CourseDefaultViewerQuery = graphql`
  query CourseDefaultViewerQuery ( $coursesPageSize: Int!){
    viewer {
      ...CourseWidget_viewer
      ...Navbar_viewer

       courses(first: $coursesPageSize, orderBy: "title:ASC", filter:"public:1") @connection(key: "CourseWidget_courses", filters: []) {
          ...CourseWidget_courses
          edges {
            node {
              id
            }
          }
        }

    }
  }
`

class CourseDefault extends Component {

  render() {

    return (
      <div>
        <QueryRenderer
          environment={environment}
          query={CourseDefaultViewerQuery}
          variables={{
            coursesPageSize:100
          }}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>
            } else if (props) {
              return <div id="course">
                <Navbar viewer={props.viewer}/>
                <div className="row">
                <CourseWidget viewer={props.viewer} courses={props.viewer.courses}/>
                </div>
                </div>
            }
            return <div>Loading</div>
          }}
        />
      </div>
    )
  }
}

export default CourseDefault
