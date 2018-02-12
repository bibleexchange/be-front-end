import React from 'react'
import ReactDOM from 'react-dom'
import {MediaTypes} from '../Note/NoteUtil'

class MediaProperty extends React.Component {

	componentWillMount(){

		this.state = {
			orderSelect: false,
      langOptions: [
        {id:"swa", display:"Swahili"},
        {id:"esp", display:"Spanish"}
      ]
    }
	}

  render(){
  	let props = this.props
  	let p = this.props.p
    let className = ""
    let display = "inherit"
    let editField = null

    if(this.state.orderSelect){
      display = "inherit"; 
      className = "fillable"
      editField = <textarea data-name={p[0]} data-index={props.index} data-pageindex={props.pageIndex} data-action="media.update" value={p[1]} onChange={props.handleChange} />
    }else{
      display = "none"; 
      className = ""
      if(typeof p[1] === "string") {
        editField = p[1].substring(0,75) + "..."
      }else{
        editField = JSON.stringify(p[1]).substring(0,75) + "...;"
      }
    }

		if(typeof p[1] === "object"){
			return this.renderObject(p, this.props)
		}else if(p[0] === "index"){ 
			return this.renderSelect(this.figureOrder())
		}else if( p[0] === "markup"){
			return this.renderSelect(this.figureMarkup())
		}else if( p[0] !== "index"){
			return <div className={className}><span onClick={this.toggleSelect.bind(this)}><strong>{p[0]}:</strong></span> {editField}</div>
		}
  }

  renderObject(p, props){

  	let display = "none"
    let className = ""
    if(this.state.orderSelect){
      display = "inherit"; 
      className = "fillable"
    }else{
      display = "none"; 
      className = ""
    }

    let text = <textarea style={{display:display}} data-name={p[0]} data-index={props.index} data-pageindex={props.pageIndex} data-action="media.update" value={JSON.stringify(p[1])} onChange={props.handleChange} />


if(p[0] === "translation"){
      let explodedP = Object.entries(p[1])
      
      let renderSelect = this.renderSelect.bind(this)
      let figureTranslation = this.figureTranslation.bind(this)
      let translations = []

      explodedP.map(function(tr, key){

         translations.push(<div key={key}>{renderSelect(figureTranslation(tr))}

        <textarea onChange={props.handleChange} 
          data-action="translation.update" 
          data-index={props.index} 
          data-pageindex={props.pageIndex} 
          data-name="value"
          data-key={tr[0]}
          value={tr[1]}
          />
        </div>)

      })

      text = <div style={{display:display}}>{translations}</div>
     
    }

  	return (<div className={className}>
	  			<span onClick={this.toggleSelect.bind(this)} ><strong>{p[0]}</strong></span>
	  		 	{text}
	  		</div>)
  }

  renderSelect(opt){

  	const props = this.props
  	let displaySelect = "none"
    let displayTitle = ""

  	// Overwriting options according to state
  	if(this.state.orderSelect){displaySelect = "inherit"; opt.display = null}else{displaySelect = "none"; }
    if(opt.displayTitle !== ""){displayTitle = <strong>{opt.displayTitle}:</strong>}
  	return (<div><span onClick={this.toggleSelect.bind(this)} >{displayTitle} {opt.displayValue}</span>
	  		<select style={{display:displaySelect}} data-old={opt.old} value={opt.dataValue} onChange={this.onChange.bind(this)} data-name={opt.dataTitle} data-action={opt.action? opt.action:"media.update"} data-index={props.index} data-pageindex={props.pageIndex}>
	  			{opt.options}
	  		</select>
  		</div>)
  }

  toggleSelect(e){
  	this.setState({orderSelect: !this.state.orderSelect})
  }

  onChange(e){
  	this.toggleSelect(e)
  	this.props.handleChange(e)
  }

  figureOrder(){
  	//Need to Set; 1) options & 2) display
	
  	let markup = null
  	let title = null
  	let i = 0
  	let props = this.props
  	//dataTitle, dataValue, displayTitle,  displayValue
  	let opt = this.getOptTemplate("index", props.index, "order", props.index)

  		while (i <= this.props.page.media.length) {

		if(props.page.media[i] !== undefined && props.page.media[i] !== null){
			title = props.page.media[i].value.substring(0,35)+"..."
			markup = "#"+ i + " " + props.media.markup
		}else{
			title = "Move to End"
			markup = ""
		}

	    opt.options.push(<option key={i} value={i} >{markup} {title}</option>)
	    i++;
	}

	return opt
  }

    figureMarkup(){
	  	let i = 0
	  	let props = this.props
	  	let opt = this.getOptTemplate("markup", props.p[1], "markup", props.p[1])	
	  	let markups = Object.values(MediaTypes)

  		while (i < markups.length) {
		    opt.options.push(<option key={i} value={markups[i]} >{markups[i]}</option>)
		    i++;
		}

	return opt
  }

  figureTranslation(p){
      let i = 0
      let props = this.props      

      let opt = this.getOptTemplate("lang", p[0], "","", p[1], "translation.update") 

      let langs = this.state.langOptions

      while (i < langs.length) {
        opt.options.push(<option key={i} value={langs[i].id} >{langs[i].display}</option>)
        i++;
    }

  return opt
  }

  getOptTemplate(dataTitle, dataValue, displayTitle,  displayValue,old, action){
  	return {
  		dataTitle,
  		dataValue,
  		displayTitle, 
  		displayValue,
  		options:[],
      old:old?old:null,
      action: action? action:"media.update"
  	}
  }

}

class EditMedia extends React.Component {

  componentWillMount(){

    this.state = {
      orderSelect: false,
      newT: false,
       newTranslation : {
        lang: "swa",
        value: ""
      },
      langOptions: [
        {id:"swa", display:"Swahili"},
        {id:"esp", display:"Spanish"}
      ]
    }
  }

  render(){
  	let props = this.props
    let display = "none"
    let className = ""
  	if(props.media.style === undefined){
  		props.media.style = {}
  	}

  if(this.state.newT){
    display = "block"
    className = "fillable"
  }else{
    display = "none"
     className = ""
  }

  let colors = {
    md: "#3D9970",
    timeline:"#FF851B",
    scripture:"#0074D9",
    barchart:"#85144b",
    imagemap:"#B10DC9"
  }

    return <div className="media" style={{borderColor: colors[props.media.markup]}}>
    	<strong><div onClick={this.props.handleChange} data-name="all" data-action="media.delete" data-index={this.props.index} data-pageindex={props.pageIndex}>delete media</div></strong>
    	<strong><div onClick={props.handleChange} data-action="media.create" data-index={props.index} data-pageindex={props.pageIndex}>create new media</div></strong>

    <div className={className} >
      <div onClick={this.toggleTrans.bind(this)}><strong>new translation</strong></div>

      <div style={{display:display}}>
        <select data-name="lang" value={this.state.newTranslation.lang} onChange={this.updateNewTranslation.bind(this)}>
          {this.state.langOptions.map(function(l){
            return <option key={l.id} value={l.id}>{l.display}</option>
          })}
        </select>
         <textarea onChange={this.updateNewTranslation.bind(this)} data-name="value" value={this.state.newTranslation.value}/>

          <button onClick={this.createNewTrans.bind(this)} data-action="translation.create" 
            data-index={props.index} 
            data-pageindex={props.pageIndex}
            data-value={this.state.newTranslation.value}
            data-lang={this.state.newTranslation.lang}
          >save new translation</button>
        </div>
      </div>


      <MediaProperty p={["index",props.index]} {...props} />

    	{Object.entries(props.media).map(function(p, key){
    		if(p[0] !== "index"){
    			return <MediaProperty key={key} p={p} {...props}/>
    		}
			
    	})}

     

    </div>
  }


  updateNewTranslation(e){
    let newState = Object.assign({}, this.state)
    newState.newTranslation[e.target.dataset.name] = e.target.value
    this.setState(newState)
  }

  toggleTrans(e){
    this.setState({newT: !this.state.newT})
  }

  createNewTrans(e){
    this.toggleTrans(e)
    this.props.handleChange(e)
  }


}

export default EditMedia