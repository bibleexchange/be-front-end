import React from 'react'
import { Link } from 'react-router-dom';
import BibleVerse from './BibleVerse'
import FocusedBibleVerse from './FocusedBibleVerse'
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

     if(this.props.options.baseURL !== undefined){
      baseURL = this.props.options.baseURL
     }

    if(this.props.bibleVerse !== null){
      verse = <FocusedBibleVerse verse={this.props.bibleVerse} baseURL={baseURL} viewer={this.props.viewer} moreNotes={this.props.moreNotes} simple={simple}/>
      message =null

      previousReference = this.props.bibleVerse.previous.reference
      nextReference = this.props.bibleVerse.next.reference
      previousURL = baseURL+ previousReference
      nextURL = baseURL+ nextReference

      onlyChapterViewBack = null
      onlyChapterViewNext = null

    }else if(this.props.bibleChapter !== null && this.props.bibleChapter !== undefined){
      verses = this.props.bibleChapter.verses.edges
      message = null

      if(this.props.bibleChapter.previousChapter.id !== this.props.bibleChapter.id){
        previousReference = this.props.bibleChapter.previousChapter.reference
        onlyChapterViewBack = <Link className="be-button-back" to={baseURL+previousReference}>previous</Link>
        previousURL = baseURL+ previousReference
      }

      if(this.props.bibleChapter.nextChapter.id !== this.props.bibleChapter.id){
        nextReference = this.props.bibleChapter.nextChapter.reference
        onlyChapterViewNext = <Link className="be-button" to={baseURL+nextReference}>next</Link> 
        nextURL = baseURL+ nextReference
      }
      
      if(this.props.bibleChapter.reference === null){
        fullReference = true
      }

    }

    if(simple){
      return <div id="bible-widget">

          <h2>{this.props.reference}</h2>
          {message}

          {verse}

          {verses.map(function(v){
            return <div key={v.node.id}><BibleVerse baseURL={baseURL} verse={v.node} viewer={viewer} fullReference={fullReference}/></div>
          })}

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

          {verse}

          {verses.map(function(v){
            return <div key={v.node.id}><BibleVerse baseURL={baseURL} verse={v.node} viewer={viewer} fullReference={fullReference}/></div>
          })}

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

  fragment BibleWidget_bibleChapter on BibleChapter {
    id 
    url
    reference
    nextChapter{
      id
      reference
    }
    previousChapter{
      id
      reference
    }
          verses(first:200){
            edges{
              node{
                ...BibleVerse_verse
                id
                verseNumber
                body
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