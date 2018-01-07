import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
//import DeleteNoteMutation from '../../mutations/DeleteNoteMutation';
import { withRouter, Link } from 'react-router-dom';

class Course extends React.Component {

  render () {
    return (
      <div id="course">
        <h2>{this.props.course.title}</h2>
        <p>
          {this.props.course.description}&nbsp;
        </p>
        <Link className="be-button" to={"/courses/" + this.props.course.id + "?title="+ this.props.course.title}>preview</Link>

      </div>
    )
  }

  _handleDelete = () => {
    //DeleteNoteMutation(this.props.note.id, this.props.viewer.id)
  }
}

const FragmentContainer =  createFragmentContainer(Course, graphql`
  fragment Course_viewer on Viewer {
    id
  }
  fragment Course_course on Course {
     id
     title
     description
     updated_at
     created_at
     owner{
        id
        name
      }
  }
`)

export default withRouter(FragmentContainer);