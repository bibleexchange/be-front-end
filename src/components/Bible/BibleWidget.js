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

  render () {
    //console.log(this.props, 'Widget - render - environment', this.props.relay.environment)

    let verses = []
    let message = "no matching bible reference"
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

    if(this.props.bibleVerse !== null){
      verse = <FocusedBibleVerse verse={this.props.bibleVerse} simpleVerse={this.props.simpleVerse} baseURL={baseURL} viewer={this.props.viewer} moreNotes={this.props.moreNotes} simple={simple}/>
      message = null

      previousReference = this.props.bibleVerse.previous.reference
      nextReference = this.props.bibleVerse.next.reference
      previousURL = baseURL+ previousReference
      nextURL = baseURL+ nextReference

      onlyChapterViewBack = null
      onlyChapterViewNext = null

    }else if(this.props.simpleVerse !== undefined){
      verse = <SimpleBibleVerse verse={this.props.simpleVerse} />
      message = ""

    }

    if(this.props.verses !== null && this.props.verses !== undefined && this.props.verses.edges.length >= 2){
      verses = this.props.verses.edges
      message = null
      verse = null

        previousReference = this.props.verses.info.previousChapterURL
        onlyChapterViewBack = <Link className="be-button-back" to={baseURL+previousReference}>previous</Link>
        previousURL = baseURL+ previousReference

        nextReference = this.props.verses.info.nextChapterURL
        onlyChapterViewNext = <Link className="be-button" to={baseURL+nextReference}>next</Link> 
        nextURL = baseURL+ nextReference    
        fullReference = false
  
    }

    if(simple){
      return <div id="bible-widget">

          <h2>{this.props.reference}</h2>
          {message}

          {verses.map(function(v){
            return <div key={v.node.id}><BibleVerse baseURL={baseURL} verse={v.node} viewer={viewer} fullReference={fullReference}/></div>
          })}

          {verse}

          {onlyChapterViewBack}
          {onlyChapterViewNext}
        </div>
    }else{

      return (
        <div id="bible-widget">
          <BibleNavigation
           reference={this.props.reference}
           updateReference={this.props.updateBibleReference}
           previousURL={previousURL}
           nextURL={nextURL}
          />

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

          {verse}

          {onlyChapterViewBack}
          {onlyChapterViewNext}
        </div>
      )
    }
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

  fragment BibleWidget_bibleVerse on BibleVerse {
    ...FocusedBibleVerse_verse
    previous {
      reference
    }
    next {
      reference
    }
  }

`)