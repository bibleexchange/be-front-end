import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter } from 'react-router-dom';
import UpdateNoteMutation from '../../mutations/UpdateNoteMutation'
import Document from './Document'

function move(old_index, new_index, array) {
    if (new_index >= array.length) {
        var k = new_index - array.length;
        while ((k--) + 1) {
            array.push(undefined);
        }
    }
    array.splice(new_index, 0, array.splice(old_index, 1)[0]);

    return array;
};

class Editor extends React.Component {

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
    if(this.props.note !== undefined && this.props.note !== null && this.props.note.config !== null && JSON.stringify(newProps.note.config) !== JSON.stringify(this.state.oldConfig)){
      let newState = this.state
      newState.oldConfig = this.figureConfig(newProps.note)
      newState.config = this.figureConfig(newProps.note)
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

    if(this.props.note !== null){

      DOCUMENT = <Document 
            state={Object.assign({},this.state)}
            handleFullEdit={this.handleFullEdit.bind(this)}   
            handleToggleEdit={this.handleToggleEdit.bind(this)}
            handleDocChange={this.handleDocChange.bind(this)}
            reportError={this.reportError.bind(this)}
            />

        noteNotPresentClass = null
    }

    return (
      <div id="editor">
        <main id="editor-main">
          <nav id="doc-nav" className={noteNotPresentClass}>
            <button  data-name="editDoc" onClick={this.toggleOption.bind(this)}>edit</button>
            <button  data-name="numbers" onClick={this.toggleOption.bind(this)}>numbers</button>
            <button  data-name="markup" onClick={this.toggleOption.bind(this)}>markup</button>
            <button  data-name="json" onClick={this.toggleOption.bind(this)}>full json</button>
            <button  data-name="meta" onClick={this.toggleOption.bind(this)}>info</button>
            <button  data-name="history" onClick={this.toggleOption.bind(this)}>history</button>
            {save}
          </nav>

          <p style={{color:"red"}}>{this.state.error}</p>

          {DOCUMENT}
        </main> 

      </div>
    )
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

handleToggleEdit(e){
    let index = parseInt(e.target.dataset.index, 10)
    let newState = Object.assign({}, this.state)

    if(newState.editState[index] !== undefined && newState.editState[index] !== null){
      newState.editState[index] = !newState.editState[index]
      
    }else{
       newState.editState[index] = true
    }

      this.setState(newState)
  }

  toggleOption(e){
    let newState = Object.assign({}, this.state)
    newState.options[e.target.dataset.name] = !newState.options[e.target.dataset.name]
    this.setState(newState)
  }




  updateNote(e){
    let viewer = this.props.viewer

    let n = {
      id: this.props.note.id,
      title: this.findMeta("title"),
      body:this.state.rawConfig,
      verse: {
        reference: this.findMeta("reference")
      },
      
      tags_string: this.findMeta("tags")
    }

    UpdateNoteMutation(n, viewer,  this.updateDocumentCallback.bind(this))
  }

  updateDocumentCallback(response){

     let newState = Object.assign(this.state, {})

     if(response.updateNote !== null){
      newState.error = response.updateNote.error

      if(response.updateNote.code === "200" || response.updateNote.error === null){
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

  dropLine(e){
    let n = this.state
    delete n.config.lines[e.target.dataset.index]
    this.updateState(n)
  }

  createLine(newLine, newState){

    if(newLine.markup === "ml"){
      let newLines = newState.config.lines.slice(0,newLine.index)
      let ml = newLine.value.split("\n")
      ml.map(function(l){
        newLines.push({markup:"md",value:l})
        return null
      })
      newLines = newLines.concat(newState.config.lines.slice(newLine.index))
      newState.config.lines = newLines
    }else{
      
      newState.config.lines.push(newLine)

      let lastIndex = newState.config.lines.length-1

      if(newLine.index !== "" && newLine.index !== lastIndex){
        newState.config.lines = move(lastIndex, newLine.index, newState.config.lines)
      }

    }
    
    newState.newLine.value = ""
    newState.newLine.index = newState.config.lines.length

    return newState
  }

  createNewLine(e){
    let newLine = {
      markup : this.state.newLine.markup,
      index : this.state.newLine.index,
      value : this.state.newLine.value
    }

    this.createLine(newLine)

    this.setState({docSaved: false})
  }

  addBlankLineHere(target, state){

    let parentLine = state.config.lines[target.dataset.index]

    let newLine = {
      markup : parentLine.markup,
      index : parseInt(target.dataset.index, 10)+1,
      value : ""
    }

    return this.createLine(newLine, state)
  }

  handleDocChange(e){
    // set data-action="model.action" || i.e., meta.delete
   
    let target = Object.assign(e.target,{})
    let x = target.dataset.action.split(".")
    let action = x[1]
    let model = x[0]



    let actions = {
      meta : {
        create : this.newMeta.bind(this),
        update: this.updateMeta.bind(this),
        delete: this.dropMeta.bind(this)
      },

      line : {
        create: this.addBlankLineHere.bind(this),
        update: this.updateLine.bind(this),
        delete: this.dropLine.bind(this)
      },

      newLine : {
        create: this.createNewLine.bind(this),
        update: this.updateNewLine.bind(this),
        delete: null 
      }
    }

    
    let state = Object.assign({},this.state)
    let newState = actions[model][action](target, state)

    newState.rawConfig = JSON.stringify(newState.config)
    newState.docSaved = false

    let newHistory = {
      lines: this.state.config.lines,
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

  updateLine(target, state){
    let index = target.dataset.index
    if(target.dataset.name === "index"){
      state.config.lines = move(index, target.value, state.config.lines)
    }else{
      state.config.lines[index][target.dataset.name] = target.value
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
/*
 handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.newLine(e)
    }
  }
*/

  updateNewLine(target, state){
      state.newLine[target.dataset.name] = target.value
      return state
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

  findMeta(key){
    this.state.config.meta.map(function(m){
      if(m.key === key){return m.value}else{return null}
    })
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