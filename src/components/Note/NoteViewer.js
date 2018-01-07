import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import SimpleBibleVerse from '../Bible/SimpleBibleVerse'
import Document from '../MyNotes/Document'

import './Note.scss'

class NoteViewer extends React.Component {

componentWillMount() {
     let config = this.figureConfig(this.props.note)

    this.state ={
      options:{
        editDoc: false,
        numbers: true,
        markup: true,
        json: false,
        meta: false,
        history: false
      },
      config: config,
      oldConfig: config,
      rawConfig: JSON.stringify(config),

      newMeta: {key:"",value:""},
      newSectionTitle: "",
      newUnitTitle:"",
      newLine:{markup:"p",value:"",index: config.lines.length},
      error: null,
      editState:[],
      docSaved: true

    }
  }

  componentWillReceiveProps(newProps){
    if(this.props.note !== undefined && this.props.note !== null && this.props.note.config !== null && JSON.stringify(newProps.viewer.note.config) !== JSON.stringify(this.state.oldConfig)){
      let newState = this.state
      newState.oldConfig = this.figureConfig(newProps.note)
      newState.config = this.figureConfig(newProps.note)
      newState.rawConfig = newProps.note.body

      newState.docSaved = true
      this.setState(newState)
    }
  }

  render() {

    let component = <h1>This note does not exist. Try <Link to={"/notes"}>searching</Link> for something else.</h1>;
    if (this.props.note !== null && this.props.note !== undefined && this.props.note !== '') {
      component = this.noteRender()
    }

    return (
          <div>{component}</div>
    );
  }

  noteRender(){

    return ( <Document 
            state={Object.assign({},this.state)}
            handleFullEdit={this.handleFullEdit}   
            handleToggleEdit={this.handleToggleEdit}
            handleDocChange={this.handleDocChange}
            reportError={this.reportError}
            />)
  }

  noteRenderDISABLED(){

    return (

      <div id="note">
        <main dangerouslySetInnerHTML={{ __html: this.props.note.output.body }} />

        <aside>

        <h1>'{this.props.note.title}' Noted by {this.props.note.author.name}</h1>

        <h2>TEXT: <Link to={this.props.note.verse.url}>{this.props.note.verse.reference}</Link></h2>
        <SimpleBibleVerse viewer={this.props.viewer} verse={this.props.note.verse} />

        <h2>TAGS</h2>
        <p>{this.props.note.tags.map(function (t, key) {
          let x = null;
          if (t !== '') { x = <Link key={key} style={{ marginRight: '10px' }} to={'/notes/tag/' + t.trim()} >#{t}</Link>; }
          return x;
        })}</p>

        </aside>
      </div>

      );
  }

   figureConfig(note){

  let config = {}
  let meta = []
  let history = []

  if(note !== null && note.body !== null){
      
      if(note.body.substring(0,1) === "{"){
        config = JSON.parse(note.body)
      }else{

        config = {
          lines: [{markup:"md", value:note.body}],
          meta: [{key:"title",value:note.title}]
        }
      }
      
      if(config.lines === null || config.lines === undefined){config.lines = []}
      if(config.meta === null || config.meta === undefined){config.meta = meta}
      if(config.history === null || config.history === undefined){config.history = history}
    }
    
    if(Object.keys(config).length === 0 && config.constructor === Object){
      config = {
      meta : meta,
      lines : [],
      history: []
      }
    }

    return config
}

}

NoteViewer.propTypes = {
  note: React.PropTypes.object.isRequired,
};

const FragmentContainer =  createFragmentContainer(NoteViewer, graphql`
  fragment NoteViewer_viewer on Viewer {
    authenticated
    ...SimpleBibleVerse_viewer
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
      ...SimpleBibleVerse_verse
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