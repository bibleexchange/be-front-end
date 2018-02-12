import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import EditMedia from './EditMedia'
import RenderPage from './RenderPage'
import './Document.scss'

class Index extends React.Component {

  componentWillMount(){

    this.state = {
      index: this.props.index
    }
  }

    componentWillReceiveProps(newProps){

    this.state = {
      index: newProps.index
    }
  }

  render(){
    return <input type="text" value={this.state.index} onChange={this.handleNewIndex.bind(this)} data-name="index" data-index={this.props.index} data-action="page.update" onBlur={this.props.handleDocChange}/>
  }

    handleNewIndex(e){
      let index = e.target.dataset.index
      let newState = Object.assign({}, this.state)
      newState.index = e.target.value
      this.setState(newState)
    }  
}

class Document extends React.Component {

  render(){
    return <div id="document">
              {this.renderViewForm()}
          </div>

  }

  renderViewForm(){

    let json = "none"
    let edit = "hide"
    let add = "hide"
    let meta = "none"
    let history = "none"
    let handleDocChange = this.props.handleDocChange
    let pages = []
    let metaList = []
    let historyList = []
    let config = this.props.state.config

    if(this.props.state.config.note !== undefined){
      pages = this.props.state.config.note.pages
      metaList = this.props.state.config.note.meta
      historyList = this.props.state.config.note.history
    }

    let options = this.props.state.options
    let rawConfig = this.props.state.rawConfig
    
    
    let toggleEdit = this.props.handleToggleEdit
    let reportError = this.props.reportError

    if(options.json){json = ""}
    if(options.meta){meta = ""}
    if(options.history){history = ""}

    if(options.editDoc){
      edit = ""
      add = ""
      let editState = this.props.state.editState

      return <div>
          <div style={{display:json}}>
            <textarea style={{width:"100%"}} value={rawConfig} onChange={this.props.handleFullEdit} />
            <hr />
          </div>

          <div style={{display:meta}}>
            <h2>info:</h2>
            {metaList.map(function(m, index){
              if(m.key === "title"){
                return <h1 key={index}>
                  <input type="text" value={m.value} data-index={index} onChange={handleDocChange} data-name="value" data-action="meta.update" />
                  </h1>

              }else if(m.key === "scripture"){
                return <blockquote key={index} className="bibleverse">
                    <input type="text" value={m.value} data-index={index} onChange={handleDocChange} data-name="value" data-action="meta.update" />
                    </blockquote>
              }else if(m !== null){
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

         {pages.map(function(p, index){

         return <div className="flexbox-container" key={index}>
            
            {p.media.map(function(m,i){
              if(m !== null){
            	return <EditMedia page={p} key={i} media={m} pageIndex={index} index={i} handleChange={handleDocChange} reportError={reportError}/>
            }
            })}            

            <nav id="page-nav">
              <li>page: <Index index={index} handleDocChange={handleDocChange}/></li>
              <button className={add} data-index={index} data-action="page.create" onClick={handleDocChange}>+ page</button>
               <button className={add} data-index={index} data-action="page.delete" onClick={handleDocChange}>delete</button>
            </nav>
            </div>
          })}

          <hr/> 

        </div>
    } else if(options.context === "preview"){

      let n = []

      options.contextVals.map(function(o){
        if(pages[o] !== undefined){
          n.push(pages[o])
        }    
      })

      pages = n

        return <div id="lines" >
        {pages.map(function(page, index){
          return <div className="flexbox-container" key={index}>
            <li>{index}</li>
            <RenderPage page={page} index={index} onClick={false} reportError={false} config={config}/>
            </div>
        })}
        </div>
    }else{

      return <div id="lines" >
        {pages.map(function(page, index){
          return <details className="flexbox-container" key={index} open>
            <summary>page: {index+1}</summary>
            <RenderPage page={page} index={index} onClick={false} reportError={false} config={config}/>
            </details>
        })}
      </div>
    }
  }
    handleUpdateNewIndex(e){
      this.props.handleChange(e)
    } 

}

export default Document

