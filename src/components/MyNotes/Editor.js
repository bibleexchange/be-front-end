import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter, Link } from 'react-router-dom';
import UpdateNoteMutation from '../../mutations/UpdateNoteMutation'
import Document from './Document'
import {configure, get, move} from '../Note/NoteUtil'
import Recorder from './Recorder'

class Editor extends React.Component {

  componentWillMount() {
     let config = configure(this.props.note)

    this.state ={
      options:{
        editDoc: true,
        numbers: true,
        json: false,
        meta: false,
        history: false
      },
      config: config,
      oldConfig: config,
      rawConfig: JSON.stringify(config),
      newMeta: {key:"",value:""},
      newPage:{value:"", index: config.pages.length},
      error: null,
      editState:[],
      docSaved: true
    }
  }

  componentWillReceiveProps(newProps){
    if(this.props.note !== undefined && this.props.note !== null && this.props.note.config !== null && JSON.stringify(newProps.note.config) !== JSON.stringify(this.state.oldConfig)){
      let newState = this.state
      newState.oldConfig = configure(newProps.note)
      newState.config = configure(newProps.note)
      newState.rawConfig = newProps.note.body

      newState.docSaved = true
      this.setState(newState)
    }
  }

  render () {

    let DOCUMENT = null
    let noteNotPresentClass = "hide"
    let save = null
    if(!this.state.docSaved){
      save = <button onClick={this.updateNote.bind(this)}>save</button>
    }
    let delButton = null
    let viewButton = null

    if(this.props.note !== null){

      DOCUMENT = <Document 
            state={Object.assign({},this.state)}
            handleFullEdit={this.handleFullEdit.bind(this)}   
            handleDocChange={this.handleDocChange.bind(this)}
            reportError={this.reportError.bind(this)}
            />

        noteNotPresentClass = null
        delButton = <button onClick={this.props.handleDelete} data-id={this.props.note.id}>delete note</button>
        viewButton = <li><Link to={"/notes/" + this.props.note.id}>view note</Link></li>
    }

    return (
      <div id="editor">
        <main id="editor-main">
          <nav id="doc-nav" className={noteNotPresentClass}>
            <button  data-name="editDoc" onClick={this.toggleOption.bind(this)}>edit</button>
            <button  data-name="numbers" onClick={this.toggleOption.bind(this)}>numbers</button>
            <button  data-name="json" onClick={this.toggleOption.bind(this)}>full json</button>
            <button  data-name="meta" onClick={this.toggleOption.bind(this)}>info</button>
            <button  data-name="history" onClick={this.toggleOption.bind(this)}>history</button>
            {delButton}
            {viewButton}
            {save}
          </nav>
          {/*<Recorder />*/}
          <p style={{color:"red"}}>{this.state.error}</p>

          {DOCUMENT}
        </main> 

      </div>
    )
  }

  toggleOption(e){
    let newState = Object.assign({}, this.state)
    newState.options[e.target.dataset.name] = !newState.options[e.target.dataset.name]
    this.setState(newState)
  }

  updateNote(e){
    let viewer = this.props.viewer
    let meta = this.state.config.meta

    let n = {
      id: this.props.note.id,
      title: meta.get("title"),
      body:this.state.rawConfig,
      verse: {
        reference: meta.get("reference")
      },
      
      tags_string: meta.get("tags")
    }

    UpdateNoteMutation(n, viewer,  this.updateDocumentCallback.bind(this))
  }

  updateDocumentCallback(response){

     let newState = Object.assign(this.state, {})

     if(response.updateNote !== null){
      newState.error = response.updateNote.error

      if(response.updateNote.code === "200" || response.updateNote.error === null || response.updateNote.error === undefined){
          newState.docSaved = true
      }

     }else{
        newState.docSaved = false

        if(response.errors !== undefined && response.errors.length >= 1){
          newState.error = "Response from server was NULL: "

          response.errors.map(function(e){
            newState.error += " " + e
            return null
          })

        }
        
     }

     this.setState(newState)

  }

  dropPage(e){
    let n = this.state
    delete n.config.pages[e.target.dataset.index]
    this.updateState(n)
  }

  createPage(newPage, newState){
     
      newState.config.pages.push(newPage)

      let lastIndex = newState.config.pages.length-1

      if(newPage.index !== "" && newPage.index !== lastIndex){
        newState.config.pages = move(lastIndex, newPage.index, newState.config.pages)
      }
    
    newState.newPage.value = ""
    newState.newPage.index = newState.config.pages.length

    return newState
  }

  addBlankPageHere(target, state){

    let parentPage = state.config.pages[target.dataset.index]

    let newPage = {
      index : parseInt(target.dataset.index, 10)+1,
      value : ""
    }

    return this.createPage(newPage, state)
  }

  handleDocChange(e){
    // set data-action="model.action" || i.e., meta.delete

    let target = Object.assign(e.target,{})
    let x = target.dataset.action.split(".")
    let action = x[1]
    let model = x[0]

    console.log(action,model)

    let actions = {
      meta : {
        create : this.newMeta.bind(this),
        update: this.updateMeta.bind(this),
        delete: this.dropMeta.bind(this)
      },

      page : {
        create: this.addBlankPageHere.bind(this),
        update: this.updatePage.bind(this),
        delete: this.dropPage.bind(this)
      }
    }

    let state = Object.assign({},this.state)
    let newState = actions[model][action](target, state)

    newState.rawConfig = JSON.stringify(newState.config)
    newState.docSaved = false

    let newHistory = {
      pages: this.state.config.pages,
      meta: this.state.config.meta,
      data: {
        ...target.dataset, 
        value: target.value
      }
    }
    
    newHistory.value = 

    newState.config.history.push(newHistory)
    this.setState(newState)

  }

   newMeta(target, state){
    state.config.meta.push(state.newMeta)
    state.newMeta = {key:"",value:""}
    return state
  }

  dropMeta(target, state){
    state.config.meta.splice(target.dataset.index, 1)
    return state
  }

  updateMeta(target, state){
      let i = target.dataset.index
      state.config.meta[i][target.dataset.name] = target.value
      return state
  }

  updateNewMeta(target, state){
    let key = target.dataset.key
    state.newMeta[key] = target.value
    return state
  }

  updatePage(target, state){
    let index = target.dataset.index
    if(target.dataset.name === "index"){
      state.config.pages = move(index, target.value, state.config.pages)
    }else{
      state.config.pages[index][target.dataset.name] = target.value
    }
    
    return state

  }

  findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

  handleFullEdit(e){
     let n = Object.assign({},this.state)
     n.rawConfig = e.target.value
     n.config = JSON.parse(e.target.value)
     n.docSaved = false
     this.setState(n)
  }

  reportError(error){
    this.setState({error: JSON.stringify(error)})
  }
 
}

const FragmentContainer =  createFragmentContainer(Editor, graphql`
  fragment Editor_viewer on Viewer {
    id
    authenticated
  }
  fragment Editor_note on UserNote {
    id
    title
    body
  }

`)

export default withRouter(FragmentContainer);