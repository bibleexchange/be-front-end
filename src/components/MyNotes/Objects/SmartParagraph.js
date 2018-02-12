import React from 'react'
import Scripture from './Scripture'
import Youtube from './Youtube'
import Quiz from './Quiz'
import md from '../../../Markdown'
 var SC = require("../../../SoundClouder");

class SmartParagraph extends React.Component {

  componentWillMount(){
    this.checkSoundCloud()
  }

  render(){
        return <span dangerouslySetInnerHTML={{__html: md.render(this.props.page.value)}} />
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
      return 
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

  checkSoundCloud(){
    SC.test()
    
    let tags = this.props.page.value.split(" ")

      SC.get('/tracks', {
       q: 'bible_exchange', tags_list: tags 
      }).then(function(tracks) {
        console.log(tracks);
      });
  }

}

export default SmartParagraph;