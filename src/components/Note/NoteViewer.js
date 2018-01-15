import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import BibleWidget from '../Bible/BibleWidget'
import Document from '../MyNotes/Document'
import {configure, get} from './NoteUtil'
import './Note.scss'

class NoteViewer extends React.Component {

componentWillMount() {
     let config = configure(this.props.note)

    this.state ={
      options:{
        editDoc: false,
        numbers: false,
        json: false,
        meta: true,
        history: false,
        contextVals: [0],
        context: "preview",
        currentPage: 0
      },

      config: config
    }

  }

  componentWillReceiveProps(newProps){
    if(this.props.note !== undefined && this.props.note !== null && this.props.note.config !== null && JSON.stringify(newProps.viewer.note.config) !== JSON.stringify(this.state.oldConfig)){
      let newState = this.state
      newState.config = configure(newProps.note)
      this.setState(newState)
    }
  }

  render() {
    let next = null
    let component = <h1>This note does not exist. Try <Link to={"/notes"}>searching</Link> for something else.</h1>;
    if (this.props.note !== null && this.props.note !== undefined && this.props.note !== '') {
      component = this.noteRender()
    }

    if(this.hasNextPage()){
      next = <button onClick={this.nextPage.bind(this)}>next</button>
    }

    return (
          <div>

          <nav>
            {next}
          </nav>

          <div id="note">
            <h1>{this.state.config.meta.get("title")}</h1>                        
          
            {component}

             <details open>
            <summary>Main Scripture:</summary>
              <BibleWidget 
              viewer={this.props.viewer} 
              bibleChapter={null} 
              bibleVerse={null}
              simpleVerse={this.props.note.verse}
              updateBibleReference={{}} 
              reference={this.props.note.verse.reference}
              moreNotes={false}
              options={{simple:true}}
              />
            </details>

            <details>
            <summary>info:</summary>

            {this.state.config.meta.map(function(m, index){
              if(m === null){
                return null
              }else if(m.key === "scripture"){
                return <p key={index}><strong>{m.key}:</strong> <Link to={"/bible/"+m.value}>{m.value}</Link></p>
              }else if(Array.isArray(m.value)){
                return <p key={index}><strong>{m.key}:</strong> #{m.value.join(" #")}</p>
              }else{  
                return <p key={index}><strong>{m.key}:</strong> {m.value}</p>
              }
            })}
            
        </details>

          </div>
          </div>
    );
  }

  noteRender(){

    return ( <Document 
            state={Object.assign({},this.state)}
            handleFullEdit={this.handleFullEdit}   
            handleDocChange={this.handleDocChange}
            reportError={this.reportError}
            />)
  }

  nextPage(){
    let newState = Object.assign({},this.state)
    newState.currentPage += 1
    newState.options.contextVals = [newState.currentPage]
    this.setState(newState)
  }

  hasNextPage(){
    if(this.state.config.pages.length > this.state.currentPage){
      return true
    }else{
      return false
    }
  }

}

NoteViewer.propTypes = {
  note: React.PropTypes.object.isRequired,
};

const FragmentContainer =  createFragmentContainer(NoteViewer, graphql`
  fragment NoteViewer_viewer on Viewer @relay(mask: true) {
    authenticated
    ...BibleWidget_viewer
  }

  fragment NoteViewer_note on Note {
      id
    title
    body
    tags
      author{
        name
      }
    verse{
      id
      body
      reference
      url
      notesCount
      verseNumber
      quote

    }
    output{
      body
    }
  }

`)

export default withRouter(FragmentContainer);