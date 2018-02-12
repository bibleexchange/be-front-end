import React from 'react'
import { Link } from 'react-router-dom';
import BibleVerse from './BibleVerse'
import FocusedBibleVerse from './FocusedBibleVerse'
import SimpleBibleVerse from './SimpleBibleVerse'
import BibleNavigation from './BibleNavigation'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

import './BibleWidget.scss'

class BibleWidget extends React.Component {

  componentWillMount(){
    this.state = {
      verses: this.props.verses? this.props.verses:{edges:[]}
    } 
  }
  componentWillUpdate(newProps){
    if(true/*newProps.verses !== null*/){
      this.setState({verses: newProps.verses? this.props.verses:{edges:[]}})
    }
  }

  shouldComponentUpdate(newProps){
    if(newProps.verses !== null || newProps.bibleVerse !== null){
      return true
    }else{
      return false
    }

  }

  render () {
    console.log(this.props, 'Widget - render - environment', this.props.relay.environment)

    let verses = this.state.verses.edges
    let message = ""
    let verse = null
    let viewer = this.props.viewer
    let previousReference = null
    let nextReference = null
    let onlyChapterViewBack = null
    let onlyChapterViewNext = null
    let previousURL = null
    let nextURL = null
    let fullReference = false
    let simple = this.props.options.simple
    let baseURL = this.props.options.baseURL? this.props.options.baseURL:"/bible/"
    let heading = null
    let hiddenHeading = null

     if(this.props.options.baseURL !== undefined){
      baseURL = this.props.options.baseURL
     }

    if(this.state.verses !== null && this.state.verses !== undefined && this.state.verses.edges.length >= 2){
      verses = this.state.verses.edges
      message = null
      verse = null

        previousReference = this.state.verses.info.previousChapterURL
        onlyChapterViewBack = <button style={{width:"48%", display:"inline-block", float:"left"}} className="be-button-back" data-reference={previousReference} onClick={this.updateReference.bind(this)}>{previousReference}</button>

        nextReference = this.state.verses.info.nextChapterURL
        onlyChapterViewNext = <button style={{width:"48%", display:"inline-block", float:"right"}} className="be-button" data-reference={nextReference} onClick={this.updateReference.bind(this)}>{nextReference}</button>
            
    }

    if(simple && this.props.verses !== null){
      let next = this.props.verses.info.nextChapterURL 
      let previous = this.props.verses.info.previousChapterURL
      onlyChapterViewBack = <button style={{width:"50%", display:"inline-block"}} className="be-button-back" data-reference={previous} onClick={this.updateBibleReference.bind(this)}>{previous}</button>
      onlyChapterViewNext = <button style={{width:"50%", display:"inline-block"}} className="be-button" data-reference={next} onClick={this.props.updateBibleReference}>{next}</button>

      return <div id="bible-widget">
          {onlyChapterViewBack}
          {onlyChapterViewNext}
          <h2>{this.props.reference}</h2>
          {message}

          {verses.map(function(v){
            return <div key={v.node.id}><BibleVerse baseURL={baseURL} verse={v.node} viewer={viewer} fullReference={fullReference}/></div>
          })}

        </div>
    }else{

      return (
        <div id="bible-widget">

          {message}

          {verses.map(function(v){

            if(v.node.book.id+v.node.chapter.id !== hiddenHeading){
              hiddenHeading = v.node.book.id+v.node.chapter.id
              heading = <h2>{v.node.book.title} {v.node.chapter.order_by}</h2>
            }else{
              heading = null
            }

            return <div key={v.node.id}>{heading}<BibleVerse baseURL={baseURL} verse={v.node} viewer={viewer} fullReference={fullReference}/></div>
          })}

          {onlyChapterViewBack}
          {onlyChapterViewNext}
        </div>
      )
    }
  } 

  updateReference(e){
    let ref = e.target.dataset.reference
    this.props.updateBibleReference(ref)
  }

}

export default createFragmentContainer(BibleWidget, graphql`
  fragment BibleWidget_viewer on Viewer {
    ...BibleVerse_viewer
    ...FocusedBibleVerse_viewer
    id  
  }

  fragment BibleWidget_verses on BibleVerseConnection {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      info{
        nextChapterURL
        previousChapterURL
      }
      edges {
        cursor
        node {
          ...BibleVerse_verse
          id
          body
          reference
          verseNumber
          crossReferences(first:$crossReferencesPageSize){
            edges{
              node{
                id
                reference
              }
            }
          }
          chapter {
            id
            order_by
          }
          book {
            id
            title
          }
        }
      }
    }

`)