import React from 'react'
import DocLine from './DocLine'
import CreateNewLine from './CreateNewLine'
import RenderLine from './RenderLine'

import './Document.css'

class Document extends React.Component {
  render(){
    return <div id="document">
              {this.renderViewForm()}
          </div>

  }

  renderViewForm(){

    let numbers = "hide"
    let markup =  "hide"
    let json = "none"
    let edit = "hide"
    let add = "hide"
    let meta = "none"
    let history = "none"
    let handleDocChange = this.props.handleDocChange
    let lines = this.props.state.config.lines
    let options = this.props.state.options
    let rawConfig = this.props.state.rawConfig
    let metaList = this.props.state.config.meta
    let historyList = this.props.state.config.history
    let createNewLine = <CreateNewLine index={lines.length} line={this.props.state.newLine} handleChange={handleDocChange}/>
    let reportError = this.props.reportError

    if(lines.length > 0){
      createNewLine = null
    }

    if(options.numbers){numbers = ""}
    if(options.markup){markup = ""}
    if(options.json){json = ""}
    if(options.meta){meta = ""}
    if(options.history){history = ""}

    if(options.editDoc){
      edit = ""
      add = ""
      let editState = this.props.state.editState
      let toggleEdit = this.props.handleToggleEdit

      return <div>
          <div style={{display:json}}>
            <textarea style={{width:"100%"}} value={rawConfig} onChange={this.props.handleFullEdit} />
            <hr />
          </div>

          <div style={{display:meta}}>
            <h2>info:</h2>
            {metaList.map(function(m, index){
              if(m !== null){
                return <p key={index}>
                        key: <input type="text" onChange={handleDocChange} value={m.key} data-index={index} data-name="key" data-action="meta.update"/> 
                        value: <input type="text" value={m.value} data-index={index} onChange={handleDocChange} data-name="value" data-action="meta.update" />
                        <button onClick={handleDocChange} data-action="meta.delete" data-index={index}>X</button>
                      </p>
              }else{
                return null
              }
            })}

            <button onClick={handleDocChange} data-action="meta.create">+</button>
            <hr />
          </div>

           <div style={{display:history}}>
            {historyList.map(function(h,i){
              return <li key={i}>{JSON.stringify(h.data)}</li>
            })}
           </div>

         {lines.map(function(l, index){


         return <div className="flexbox-container" key={index}>
            <li className={edit} data-index={index} onClick={toggleEdit}>{editState[index] === true ? 'view' : 'edit' }</li>
            <li className={add} data-index={index} data-action="line.create" onClick={handleDocChange}>+</li>
            <li className={numbers}>{index}</li>
            <li className={markup}>{l.markup}</li>
            
            <DocLine line={l} save={false} index={index} edit={editState[index]} handleChange={handleDocChange} reportError={reportError}/>
            </div>
          })}

          <hr/> 
            {createNewLine}
        </div>
    }else{

      return <div id="lines" >

          <div style={{display:json}}>
            <code>{rawConfig}</code>
            <hr />
          </div>

          <div style={{display:meta}}>
            <h2>info:</h2>
            {metaList.map(function(m, index){
              if(m !== null){return <p key={index}><strong>{m.key}:</strong> {m.value}</p>}else{return null}
            })}
            <hr />
          </div>

        {lines.map(function(line, index){
          return <div className="flexbox-container" key={index}>
            <li className={numbers}>{index}</li>
            <li className={markup}>{line.markup}</li>
            <RenderLine line={line} index={index} onClick={false} reportError={reportError}/>
            </div>
        })}
      </div>
    }
  }

}

export default Document

