import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter, Link } from 'react-router-dom';
import BibleNote from './BibleNote'
import CrossReference from './CrossReference'

class FocusedBibleVerse extends React.Component {

  componentWillMount(){
    this.state = {
      newNote: null
    }
  }

 // componentWillReceiveProps(props){
 //   console.log(props)
 // }

  render () {

    let moreNotes = null
    let makeNote = null
    let noNotes = null//<i>(No notes on this verse, yet!)</i>
    let crossReferences = []
    let notes = []
    let notesHeading = null
    let crossReferencesHeading = null
    let goToChapterURL = this.props.verse.chapterURL
    let baseURL = "/bible/"

    if(this.props.baseURL !== undefined){
      baseURL = this.props.baseURL
      goToChapterURL = goToChapterURL.replace("/bible/",baseURL)
    }
    

    if(this.props.verse.notes !== null) {
      
      notesHeading = <h2>Notes</h2>

      if(this.props.verse.notes.pageInfo.hasNextPage){
        moreNotes = <button onClick={this._handleMoreNotes.bind(this)}>more notes</button>
      }

      if(this.props.verse.notes.edges.length >= 1){
        noNotes = null
      }

      notes = this.props.verse.notes.edges

    }

    if(this.props.verse.crossReferences !== null){
      crossReferences = this.props.verse.crossReferences.edges
      crossReferencesHeading = <div><hr/> <b>cross references: </b></div>
    }

    if(this.props.viewer.authenticated){
      makeNote = <Link to={"/create/"+this.props.verse.id+"?back="+this.props.location.pathname}  className="be-button" >make a note on {this.props.verse.reference}</Link>
    }

console.log(crossReferences)
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
          
          <blockquote>{this.props.verse.reference } <br />{this.props.verse.body}</blockquote>

          <Link className="be-button" to={this.props.verse.chapterURL}>Go to {this.props.verse.book.title} {this.props.verse.chapterNumber}</Link>
          
          {crossReferencesHeading}
          {crossReferences.map(function(cr){
            return <CrossReference key={cr.node.id} reference={cr.node} />
          })}

          {makeNote}

          {notesHeading}
          {notes.map(({node}) =>
            <BibleNote key={node.id} note={node} viewer={this.props.viewer} selectNote={this._editNote.bind(this)} />
          )}

          {noNotes}

          {moreNotes}

      </div>
    )
    }
    
  }

  _editNote = (e) => {
    this.setState({newNote: e.target.value})
  }

    _updateNote = (e) => {
    this.props.updateReference(this.state.reference)
  }

  _handleMoreNotes = (e) => {
    e.preventDefault()
    this.props.moreNotes(e)
  }
}

const FragmentContainer =  createFragmentContainer(FocusedBibleVerse, graphql`
  fragment FocusedBibleVerse_viewer on Viewer {
    id
    ...BibleNote_viewer
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
    notes(first:$notesPageSize){
      pageInfo {
        hasNextPage
      }
      edges{
        node{
          id
          title
          body
          ...BibleNote_note
        }
      }
    }
  }

`)

export default withRouter(FragmentContainer);