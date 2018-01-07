import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { Link } from 'react-router-dom'
import CreateNoteMutation from "../../mutations/CreateNoteMutation"
import UpdateNoteMutation from "../../mutations/UpdateNoteMutation"
import DeleteNoteMutation from "../../mutations/DeleteNoteMutation"
import './MyNotes.scss'
import './CourseEditor.css'

import Editor from './Editor'


var MenuItem = React.createClass({

  render: function() {
    return <button className="menu-item" onClick={this.props.handleEditThis} data-id={this.props.note.id}>{this.props.children}</button>;
  }
});

var Menu = React.createClass({

  render: function() {
    return <div className="menu">
      <div className={(this.props.status ? "visible " : "") + this.props.alignment}>{this.props.children}</div>
    </div>;
  }
});

class MyNotes extends React.Component {

componentWillMount(){
  let newNote = this._cloneNote()

  let newNoteId = "newunsaved"

  if(this.props.userNote !== null){
    newNote = this._cloneNote(this.props.userNote)
    //newNote.body = newNote.body.split("\n")
    newNoteId = this.props.userNote.id
  }else if(this.props.verse !== null){
    newNote.verse = this.props.verse
  }

  this.state = {
    newNoteId: newNoteId,
    newNote: newNote,
    notesStatus: false,
    saved: true,
    distractionFree: false,
    newnoteTitle:"",
  }
}

componentWillReceiptProps(newProps){
  if(newProps.userNote.id !== this.state.newNoteId){
    this.setState({newNote: newProps.userNote})
  }

}

  render () {
let state = this.state
let save = null
let cancel = null
let deletebutton = null
let viewButton = null
let createnoteButton = null
let handleEditThis = this._handleEditNote.bind(this)

if (this.state.saved === false){
  save = <li><button onClick={this.saveNoteChanges.bind(this)}>save</button></li>
  cancel = <li><button onClick={this._clearChanges.bind(this)}>clear changes</button></li>
}

if(this.state.newnoteTitle !== ""){
  createnoteButton = <button onClick={this.createNote.bind(this)}>click to create new:  "{this.state.newnoteTitle}"</button>
}

if(this.state.newNote.id !== undefined){
  deletebutton = <li><button onClick={this._deleteNote.bind(this)}>delete note</button></li>
  viewButton = <li><Link to={"/notes/" + this.state.newNote.id}>view note</Link></li>
}else{

}

    return (
      <div id="my-notes" className={"distraction-free-"+this.state.distractionFree}>

        <nav>
          <li><button onClick={this._handleDistractionFree.bind(this)}>Distraction Free</button></li>
          <li><button onClick={this._handleMyNotes.bind(this)} >My Notes</button>

          <ul className={"my-notes-"+this.state.notesStatus}>
              <Menu ref="left" alignment="left" status={this.state.menu}>
              <form>
                <input type="text" style={{width:"100%", lineHeight:"50px", textAlign:"center", fontSize:"1.5rem"}} value={this.state.newnoteTitle} onChange={this.updateNewnoteTitle.bind(this)}/>
                {createnoteButton}
              </form>

              {this.props.userNotes.edges.filter(function(item){
                if(item.node !== undefined){
                  return item.node.title.toLowerCase().search(state.newnoteTitle.toLowerCase()) !== -1;
                }
                return null
              }).map(function(c){
                return <MenuItem key={c.node.id} note={c.node} handleEditThis={handleEditThis}>{c.node.title}</MenuItem>
              })}

            </Menu> 

          </ul>
          </li>
          <li>{this.state.notesStatus}</li>
          {save}
          {cancel}
          {deletebutton}
          {viewButton}

        </nav>

        <main>
          <Editor viewer={this.props.viewer} note={this.props.userNote} />
        </main>
        
      </div>
    )
  }

 _handleEditNote = (e) => {
  this.props.selectNote(e.target.dataset.id)
 }

  _createNewLine = (e) => {
        let index = +e.target.dataset.id+1

        let n = this.state.newNote
        n.splice(index, 0, "");
        this.setState({newNote: n})
  }

 _editThis = (e) => {

  let prop = e.target.id
  let value = e.target.value
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

 _handleMyNotes = (e) => {
    this.setState({notesStatus: this.state.notesStatus? false:true})
 }

 _handleDistractionFree= (e) => {
    this.setState({distractionFree: this.state.distractionFree? false:true})
 }

  saveNoteChanges = (e) => {
    
    if(this.state.newNote.id === null || this.state.newNote.id === undefined){
      CreateNoteMutation(this.state.newNote, this.props.viewer, this._saveCallback)
    }else{
      UpdateNoteMutation(this.state.newNote, this.props.viewer, this._saveCallback)
    }
    this.setState({notesStatus: false, saved: true})
    
 }

_deleteNote = (e) => {
    DeleteNoteMutation(this.state.newNote.id, this.props.viewer, this._deleteCallback)
    this.setState({notesStatus: false, saved: true})
    
 }

 _saveCallback = (response) => {
  this.props.saveCallback(response)
 }

_deleteCallback = (response) => {
    this.setState({newNote: this._cloneNote()})
    this.props.saveCallback(response)
 }

_cloneNote = (note = false) => {

  if(note === false){

    let verse = {id:"",reference:""}

    if(this.props.verse !== null){
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

  _clearChanges  = () => {

      if(this.props.userNote !== null){
        this.setState({newNote: this._cloneNote(this.props.userNote), save: true})
      }else {
        let newNote = this._cloneNote()
          
        if(this.props.verse !== null){
          newNote.verse = this.props.verse
        }

        this.setState({newNote:  newNote, saved: true})
      }
    

  }

  updateNewnoteTitle(e){
    this.setState({newnoteTitle: e.target.value})
  }

  createNote(e){
    e.preventDefault()
    
    let note = {
      title: this.state.newnoteTitle,
      body:"",
      verse: {
        reference: this.props.verse? this.props.verse.reference:"Genesis 1:1"
      },
      
      tags_string: ""
    }

    CreateNoteMutation(note, this.props.viewer,  this.newNoteCallback.bind(this) )
  }

  newNoteCallback(response){
    console.log("new note created",response)
  }


}

const FragmentContainer =  createFragmentContainer(MyNotes, graphql`
  fragment MyNotes_viewer on Viewer {
    id
    authenticated
    ...Editor_viewer
  }

  fragment MyNotes_userNotes on UserNoteConnection {
    edges{
      node {
        id
        title
        verse {
          id
          reference
        }
        tags
        created_at
        updated_at
      }
    }
  }

  fragment MyNotes_userNote on UserNote {
    ...Editor_note
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

   fragment MyNotes_verse on BibleVerse {
    id
    reference
    quote
  }

`)

export default FragmentContainer