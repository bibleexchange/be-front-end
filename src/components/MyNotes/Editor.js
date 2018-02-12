import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter, Link } from 'react-router-dom';
import UpdateNoteMutation from '../../mutations/UpdateNoteMutation'
import Document from './Document'
import {translateNote, get, move, makePage, makeMedia} from '../Note/NoteUtil'
import Recorder from './Recorder'
import Loader from '../App/Loader'
import auth from '../../auth'

class Editor extends React.Component {

  componentWillMount() {
     let config = translateNote(this.props.note, false)

    this.state ={
      options:{
        json: false,
        meta: false,
        history: false
      },
      config: config,
      oldConfig: config,
      rawConfig: JSON.stringify(config),
      newMeta: {key:"",value:""},
      newPage: makePage(config.note.pages.length),
      error: {
        code:200, message: null
      },
      editState:[],
      docSaved: true,
      docLocked: false
    }
  }

  componentWillReceiveProps(newProps){
    if(this.props.note !== undefined && this.props.note !== null && this.props.note.config !== null && JSON.stringify(newProps.note.config) !== JSON.stringify(this.state.oldConfig)){
      let newState = this.state
      newState.oldConfig = translateNote(newProps.note, false)
      newState.config = translateNote(newProps.note, false)
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
    let error = null

    if(this.state.error.code !== 200){
      error = <p style={{color:"red"}}>{this.state.error.code}: {this.state.error.message}</p>
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
        delButton = <button onClick={this.props.command} data-action="note.delete" data-id={this.props.note.id}>delete note</button>
        viewButton = <li><Link to={"/notes/" + this.props.note.id}>view note</Link></li>
    }

    return (
      <div id="editor" className={"locked-"+this.state.docLocked}>
        <Loader />
        <main id="editor-main">
          <nav id="doc-nav" className={noteNotPresentClass}>
            <button  data-name="editDoc" onClick={this.toggleOption.bind(this)}>edit</button>
            <button  data-name="json" onClick={this.toggleOption.bind(this)}>full json</button>
            <button  data-name="meta" onClick={this.toggleOption.bind(this)}>info</button>
            <button  data-name="history" onClick={this.toggleOption.bind(this)}>history</button>
            {delButton}
            {viewButton}
            {save}
          </nav>
          {/*<Recorder />*/}
          {error}

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
    this.setState({docLocked: true})
    let viewer = this.props.viewer

    let n = {
      id: this.props.note.id,
      body:this.state.rawConfig
    }

    if(this.state.config.note !== undefined){
      let meta = this.state.config.note.meta
      n.title = meta.get("title")
      n.verse = {reference: meta.get("reference")}
      n.tags_string = meta.get("tags")
    }

    UpdateNoteMutation(n, auth.getToken(),  this.updateDocumentCallback.bind(this))
  }

  updateDocumentCallback(response){

     let newState = Object.assign(this.state, {})
     
     newState.docLocked = false

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

   dropPage(target, state){
    let index = target.dataset.index    
    delete state.config.note.pages[index]

    let pages = []

    state.config.note.pages.map(function(p){
      if(p !== null){
        pages.push(p)
      }
    })

    if(pages.length <= 0){
      pages = [makePage()]
    }

    state.config.note.pages = pages
    return state

  }

  createPage(newPage, newState){
     
      newState.config.note.pages.push(newPage)

      let lastIndex = newState.config.note.pages.length-1

      if(newPage.index !== "" && newPage.index !== lastIndex){
        newState.config.note.pages = move(lastIndex, newPage.index, newState.config.note.pages)
      }
    
    newState.newPage = newPage

    return newState
  }

    createMedia(newMedia, newState, parentIndex){
     
      newState.config.note.pages[parentIndex].media.push(newMedia)

      let lastIndex = newState.config.note.pages[parentIndex].media.length-1

      if(newMedia.index !== "" && newMedia.index !== lastIndex){
        newState.config.note.pages[parentIndex].media = move(lastIndex, newMedia.index, newState.config.note.pages[parentIndex].media)
      }

    return newState
  }

  addBlankPageHere(target, state){

    let parentPage = state.config.note.pages[target.dataset.index]

      let newPage = makePage(parseInt(target.dataset.index, 10)+1)
    return this.createPage(newPage, state)
  }

  addMediaHere(target, state){
      let newMedia = makeMedia(parseInt(target.dataset.index, 10)+1)
      let parentIndex = parseInt(target.dataset.pageindex, 10)
    return this.createMedia(newMedia, state, parentIndex)
  }

  handleDocChange(e){
    // set data-action="model.action" || i.e., meta.delete

    let target = e.target

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
      },

      media : {
        create: this.addMediaHere.bind(this),
        update: this.updateMedia.bind(this),
        delete: this.dropMedia.bind(this)
      },

      translation : {
        create: this.createTranslation.bind(this),
        update: this.updateTranslation.bind(this),
        delete: this.deleteTranslation.bind(this)
      }
    }

    let state = Object.assign({},this.state)
    let newState = actions[model][action](target, state)

    newState.rawConfig = JSON.stringify(newState.config)
    newState.docSaved = false
/*
    let newHistory = {
      pages: this.state.config.note.pages,
      meta: this.state.config.note.meta,
      data: {
        ...target.dataset, 
        value: target.value
      }
    }
    
    newHistory.value = 

    newState.config.note.history.push(newHistory)
*/
    newState.config.note.history = []
    this.setState(newState)

  }

  createTranslation(target, state){
     let d = target.dataset
     state.config.note.pages[d.pageindex].media[d.index].translation[d.lang] = d.value
    return state
  }

  updateTranslation(target, state){

    let d = target.dataset

    if(d.name === "lang"){
      state.config.note.pages[d.pageindex].media[d.index].translation[target.value] = d.old
    }else if(d.name === "value"){
      state.config.note.pages[d.pageindex].media[d.index].translation[d.key] = target.value
    }

    return state
  }

  deleteTranslation(target, state){
     
      console.log(target)

    return state
  }

   newMeta(target, state){
    state.config.note.meta.push(state.newMeta)
    state.newMeta = {key:"",value:""}
    return state
  }

  dropMeta(target, state){
    state.config.note.meta.splice(target.dataset.index, 1)
    return state
  }

  updateMeta(target, state){
      let i = target.dataset.index
      state.config.note.meta[i][target.dataset.name] = target.value
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
      state.config.note.pages = move(index, target.value, state.config.note.pages)
    }else{
      state.config.note.pages[index][target.dataset.name] = target.value
    }
    
    return state

  }

  updateMedia(target, state){
    let index = target.dataset.index
    let pageIndex = target.dataset.pageindex

    if(target.dataset.name === "style"){
      state.config.note.pages[pageIndex].media[index].style = JSON.parse(target.value)
    }else if(target.dataset.name === "index"){
      state.config.note.pages[pageIndex].media = move(index, target.value, state.config.note.pages[pageIndex].media)
    }else{
      state.config.note.pages[pageIndex].media[index][target.dataset.name] = target.value
    }
    
    return state

  }

  dropMedia(target, state){
    let index = target.dataset.index
    let pageIndex = target.dataset.pageindex
    delete state.config.note.pages[pageIndex].media[index]

    let media = []

    state.config.note.pages[pageIndex].media.map(function(m){
      if(m !== null){
        media.push(m)
      }
    })

    state.config.note.pages[pageIndex].media = media
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

     try {
      n.config = JSON.parse(e.target.value)
     }
     
     catch(error){
      n.config = error.messaage + "!: " + e.target.value
     }


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
    verse {
      id
      reference
    }
  }

`)

export default withRouter(FragmentContainer);