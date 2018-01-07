import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
//import DeleteNoteMutation from '../../mutations/DeleteNoteMutation';
import { withRouter, Link } from 'react-router-dom';

class CourseBadge extends React.Component {

  render () {
    return (
      <div>
        <h2>{this.props.course.title}</h2>
        <p>
          {this.props.course.description}&nbsp;
        </p>
        <Link className="courseCallToAction" to={"/courses/" + this.props.course.id + "?title="+ this.props.course.title}>preview</Link>

      </div>
    )
  }

  _handleDelete = () => {
    //DeleteNoteMutation(this.props.note.id, this.props.viewer.id)
  }
}

const FragmentContainer =  createFragmentContainer(CourseBadge, graphql`
  fragment CourseBadge_viewer on Viewer {
    id
  }
  fragment CourseBadge_course on Course {
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