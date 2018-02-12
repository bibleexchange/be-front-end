import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter } from 'react-router-dom';
import Editor from './Editor'

class MenuItem extends React.Component {

  render() {
    return <div className="menu-item" >
      <button data-action="menu.edit" onClick={this.props.command} data-id={this.props.note.id}>{this.props.children}</button>
      {/*<button data-action="note.delete" onClick={this.props.command} data-id={this.props.note.id}>X</button>*/}
      </div>;
  }
}

class Menu extends React.Component {

  render() {
    return <div className="menu">
      <div className={(this.props.status ? "visible " : "") + this.props.alignment}>{this.props.children}</div>
    </div>;
  }
}

class MyNotesComponent extends React.Component {

  render () {

    let {saved,notesStatus, newNote, menu, distractionFree} = this.props.state
    //let notesStatus = this.props.open
    let save = null
    let cancel = null
    let viewButton = null
    let createnoteButton = null
    let command = this.props.command
    let userNotes = []

    if(this.props.userNotes !== null){
      userNotes = this.props.userNotes.edges
    }
      if (!saved){
        save = <li><button data-action="note.save" onClick={command}>save</button></li>
        cancel = <li><button data-action="note.reset" onClick={command}>clear changes</button></li>
      }

      if(newNote.title !== ""){
        
        if(this.props.verse === undefined || this.props.verse === null || this.props.verse .reference === null){
          
          let title = null
          let message = null
          if(newNote.verse.reference.indexOf(":") > -1 && newNote.verse.reference.substr(newNote.verse.reference.length - 1) !== ":"){
            title = <button onClick={command} data-action="verse.update" data-reference={newNote.verse.reference}>set note reference</button>
          }

          if(this.props.verse !== null && this.props.verse.id !== null && this.props.verse.reference === null){
            message = <p style={{color:"red"}}>Not a Valid Scripture Reference. Please, try again.</p>
          }

          createnoteButton = <div>

                                title: <br /><input type="text" id="search-title" value={newNote.verse.reference} data-action="newnote.update" data-name="reference" onChange={command}/>
                                reference: <br />{title}
                                {message}
                            </div>
        }else{
          createnoteButton = <div>
            <button onClick={command} data-action="verse.delete">- change verse</button>
            <p>{this.props.verse.reference} &mdash; {this.props.verse.body}</p>
            <button data-action="note.create" onClick={command}>create note:  "{newNote.title}" on {this.props.verse.reference}</button>
            </div>
        }
        
      }

      return (
        <div id="my-notes" className={"distraction-free-"+distractionFree}>
          <nav>
            
            <li><button  data-action="menu.notes" onClick={command} >My Notes</button>

            <ul className={"my-notes-"+notesStatus}>
                <button data-action="menu.full" onClick={command}>Distraction Free</button>
                <Menu ref="left" alignment="left" status={menu}>
                <form>
                  <input type="text" id="search-title" value={newNote.title} data-action="newnote.update" data-name="title" onChange={command}/>
                  {createnoteButton}
                </form>

                {userNotes.filter(function(item){
                  if(item.node !== undefined){
                    if(item.node.title !== null){
                      return item.node.title.toLowerCase().search(newNote.title.toLowerCase()) !== -1;
                    }                  
                  }
                  return null
                }).map(function(c){
                  return <MenuItem key={c.node.id} note={c.node} command={command}>{c.node.title}</MenuItem>
                })}

              </Menu> 

            </ul>
            </li>
            {save}
            {cancel}
            {viewButton}

          </nav>

          <main>
            <Editor viewer={this.props.viewer} note={this.props.note} command={command} />
          </main>
          
        </div>)

  }


 
}

const FragmentContainer =  createFragmentContainer(MyNotesComponent, graphql`
  fragment MyNotesComponent_viewer on Viewer {
    ...Editor_viewer
    id
    authenticated
  }
  fragment MyNotesComponent_note on UserNote {
    ...Editor_note
    id
    title
    body
    verse{
      id
      reference
      body
    }
  }

    fragment MyNotesComponent_verse on BibleVerse {
      id
      reference
      body
    }

    fragment MyNotesComponent_userNotes on UserNoteConnection {
        edges {
          node {
            id
          }
        }
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

`)

export default withRouter(FragmentContainer);