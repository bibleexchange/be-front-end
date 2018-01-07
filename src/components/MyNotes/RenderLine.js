/* eslint no-unreachable: "off" */

import React from 'react'
import Scripture from './Objects/Scripture'
import Youtube from './Objects/Youtube'
import SmartParagraph from './Objects/SmartParagraph'
import Quiz from './Objects/Quiz'

class RenderLine extends React.Component {

  render(){
    return <div onClick={this.props.onClick}>{this.renderObject()}</div>
  }

  renderObject(){
    switch(this.props.line.markup){

    case "embed": {

        let url = this.parseURL(this.props.line.value)

        if(url.domain === "youtube"){
          return <Youtube {...this.props} url={url}/>
        }
    break  
    }
    case "scripture": 
      return <Scripture {...this.props}/>
      break
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return <this.props.line.markup>{this.props.line.value}</this.props.line.markup>
      break
    case "md":
      return <SmartParagraph {...this.props} />
      break
    case "raw":
      return <div dangerouslySetInnerHTML={{__html: this.props.line.value}} />
      break
    case "quiz":
      return <Quiz {...this.props} />
      break
    default:
        return <p>{this.props.line.value}</p>

    }       
      
  }

  parseURL(string){

    let url = {
      protocol: "",
      domain:"",
      path:""
    }

    let protocol = "http:";

    if(string.includes(protocol)){
      string = string.replace(protocol,"")
    }else{
      protocol = "https:"
      if(string.includes(protocol)){
        string = string.replace(protocol,"")
        
      }

    }
    string = string.replace("//","")

    url.protocol = protocol.replace(":","")

    string = string.split("/")
    
    let domain = string[0].split(".")

    if(domain.length === 3){
      url.subdomain = domain[0]
      url.domain = domain[1]
      url.tld = domain[2]
    }else if(domain.length === 2){
      url.subdomain = "www"
      url.domain = domain[0]
      url.tld = domain[1]
    }

    url.path = string[1]

    return url

  }
}

export default RenderLine