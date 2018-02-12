import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter, Link } from 'react-router-dom'
import CrossReference from './CrossReference'
import NoteThumbnail from '../Note/NoteThumbnail'

class FocusedBibleVerse extends React.Component {

  render () {

    let crossReferences = []
    let crossReferencesHeading = null
    let goToChapterURL = this.props.verse.chapterURL
    let baseURL = "/bible/"
    let ifVerseNotNull = null

    if(this.props.baseURL !== undefined && goToChapterURL !== null){
      baseURL = this.props.baseURL
      goToChapterURL = goToChapterURL.replace("/bible/",baseURL)
    }
    
    if(this.props.verse.reference !== null){
      ifVerseNotNull = <div><blockquote>{this.props.verse.reference } <br />{this.props.verse.body}</blockquote>

          <Link className="be-button" to={this.props.verse.chapterURL}>Go to {this.props.verse.book.title} {this.props.verse.chapterNumber}</Link>
          
          {crossReferencesHeading}
          {crossReferences.map(function(cr){
            return <CrossReference key={cr.node.id} reference={cr.node} />
          })}
          </div>
    }

    if(this.props.verse.crossReferences !== null){
      crossReferences = this.props.verse.crossReferences.edges
      crossReferencesHeading = <div><hr/> <b>cross references: </b></div>
    }

    if(this.props.simple){
      return (
            <div className="bible-verse">           
                <blockquote>{this.props.verse.reference } <br />{this.props.verse.body}</blockquote>
                <Link className="be-button" to={goToChapterURL}>Read {this.props.verse.book.title} {this.props.verse.chapterNumber}</Link>
            </div>
          )
    }else{
      return (
      <div className="bible-verse">
          {ifVerseNotNull}
      </div>
    )
    }
    
  }


}

const FragmentContainer =  createFragmentContainer(FocusedBibleVerse, graphql`
  fragment FocusedBibleVerse_viewer on Viewer {
    id
    ...NoteThumbnail_viewer
  }

  fragment FocusedBibleVerse_verse on BibleVerse {
    id  
    reference
    body
    verseNumber
    chapterNumber
    chapterURL
    crossReferences(first:$crossReferencesPageSize) {
      edges{
        node{
          id
          ...CrossReference_reference
        }
      }
    }
    book {
      id
      title
    }

  }

`)

export default withRouter(FragmentContainer);