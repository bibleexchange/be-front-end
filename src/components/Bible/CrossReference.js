import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter, Link } from 'react-router-dom';
import './CrossReference.scss'

class CrossReference extends React.Component {
  render () {

    return (
      <span className="cross-reference">
          <Link to={"/bible/"+this.props.reference.reference}>{this.props.reference.reference} </Link> 
          <span className="tooltiptext">{this.props.reference.verses.edges.map(function(v){
            return <p key={v.node.id}>{v.node.reference} {v.node.body}</p>
          })}</span>
      </span>
    )
  }
}

const FragmentContainer =  createFragmentContainer(CrossReference, graphql`

  fragment CrossReference_reference on CrossReference {
          id
          reference
          verses{
            edges {
              node{
                id
                reference
                body
              }
            }
          }
  }

`)

export default withRouter(FragmentContainer);