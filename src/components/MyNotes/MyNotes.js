import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql,
  createFragmentContainer
} from 'react-relay'
import { withRouter, Link } from 'react-router-dom'
import environment from '../../createRelayEnvironment'
import Loader from '../App/Loader'
import auth from '../../auth'
import './MyNotes.scss'
import MyNotesComponent from './MyNotesComponent'
import CreateNoteMutation from "../../mutations/CreateNoteMutation"
import UpdateNoteMutation from "../../mutations/UpdateNoteMutation"
import DeleteNoteMutation from "../../mutations/DeleteNoteMutation"

class MyNotes extends Component {

  componentWillMount(){

    let newNote = this._cloneNote()

    this.state = {
      newNote: newNote,
      notesStatus: this.props.open,
      saved: true,
      distractionFree: false,
      error: {code:200, message:null}
    }
  }

  render() {
    let props = this.props

     return <MyNotesComponent 
                error={this.state.error} 
                viewer={props.viewer} 
                note={props.userNote} 
                verse={props.bibleVerse}
                userNotes={props.userNotes} 
                command={this.command.bind(this)} 
                state={this.state}
              />  
  }

command(e){
   // set data-action="model.action" || i.e., meta.delete
   e.preventDefault()

    let target = e.target

    let x = target.dataset.action.split(".")
    let action = x[1]
    let model = x[0]

    console.log(action,model)

    let actions = {
      note : {
        create : this.createNote.bind(this),
        save: this.saveNoteChanges.bind(this),
        reset: this.clearChanges.bind(this),
        delete: this.deleteNote.bind(this),
        update: this.editThis.bind(this)
      },

      newnote : {
        update: this.updateNewNote.bind(this),
      },

      menu : {
        edit: this.handleEditThis.bind(this),
        full: this._handleDistractionFree.bind(this),
        notes: this._handleMyNotes.bind(this)
      },

      verse: {
        update: this.handleUpdateReference.bind(this),
        delete: this.handleClearReference.bind(this),
      }

    }

    let state = Object.assign({},this.state)
    let newState = actions[model][action](target, state)

    this.setState(newState)
}

 handleEditThis(target, state){
  state.saved = true
  state.notesStatus = false
  this.props.selectNote(target.dataset.id)
  return state
 }

 editThis(target, state){

  let prop = target.id
  let value = target.value
  let note = this._cloneNote(this.state.newNote)

    switch(prop){
      case 'title':
        note.title = value
        break;
      case 'body':
        note.body = value
        break;
      case 'tags_string':
        note.tags_string = value
        break;
      case 'reference':
        note.verse.reference = value
        break;
      default:
        ///
    }

    this.setState({newNote: note, saved:false})

 }

 _handleMyNotes (target, state) {
    state.notesStatus  = !state.notesStatus
    return state
 }

 _handleDistractionFree(target, state){
    state.distractionFree  = !state.distractionFree
    return state
 }

  saveNoteChanges(target, state){
    
    if(this.state.newNote.id === null || this.state.newNote.id === undefined){
      CreateNoteMutation(this.state.newNote, auth.getToken(), this._saveCallback)
    }else{
      UpdateNoteMutation(this.state.newNote, auth.getToken(), this._saveCallback)
    }
    state.notesStatus = false
    return state
 }

deleteNote(target, state){
    DeleteNoteMutation(target.dataset.id, auth.getToken(), this._deleteCallback)
    state.notesStatus = true
    return state
 }

 _saveCallback = (response) => {
    console.log("#################################################3",response.updateNote.error.message)
    //this.setState({error: response.updateNote.error.message})
 }

_deleteCallback = (response) => {
    //this.setState({newNote: this._cloneNote()})
    console.log("deleted response", response)
 }

_cloneNote = (note = false) => {

  if(note === false){

    let verse = {id:"",reference:""}

    if(this.props.verse !== null && this.props.verse !== undefined){
      verse = this.props.verse
    }

    return {
        title:"",
        body: "",
        tags_string:"",
        verse: verse,
        updated_at: ""
      }
  }else{
     return {
        id: note.id,
        title:note.title,
        body: note.body,
        tags_string:note.tags_string,
        verse:{id:note.verse.id,reference:note.verse.reference},
        updated_at: note.updated_at
      }
  }
}

  clearChanges(target, state){
      state.newNote =  this._cloneNote()
      state.saved = true
      return state
  }

  updateNewNote(target, state){
    let prop = target.dataset.name

    if(prop === "reference"){
      state.newNote.verse.reference = target.value
    }else{
      state.newNote[target.dataset.name] = target.value
    }
    
    return state
  }

  createNote(target, state){
    CreateNoteMutation(this.state.newNote, auth.getToken(),  this.newNoteCallback.bind(this), this.newNoteError.bind(this) )

    return state
  }

  newNoteCallback(resp){
    console.log("new note created",resp)

    if(resp.createNote.error.code >= 500){
      this.setState({error: resp.createNote.error.message, saved: false})
    }else{
      this.setState({saved: true, error:null})
    }
    
  }

  newNoteError(error){
    console.log("creation failed",error)

    this.setState({saved: false})
  }

  handleUpdateReference(target, state){
      state.reference = target.dataset.reference
      return state
  }

    handleClearReference(target, state){
      state.newNote.verse.reference = ""
      state.reference = undefined
      return state
  }

}

export default createFragmentContainer(MyNotes, graphql`
    fragment MyNotes_viewer on Viewer {   
      id
      authenticated
      ...MyNotesComponent_viewer
     }

      fragment MyNotes_userNotes on UserNoteConnection{
        edges {
          node {
            id
          }
        }
        ...MyNotesComponent_userNotes
      }

       fragment MyNotes_userNote on UserNote {
        ...MyNotesComponent_note
        id
        title
        body
        tags_string
        verse {
          id
          reference
        }
        created_at
        updated_at

      }

      fragment MyNotes_bibleVerse on BibleVerse {
        ...MyNotesComponent_verse
        id
        reference
        quote
      }

`)