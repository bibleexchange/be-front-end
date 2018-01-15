import React from 'react'
var myMDPlugin = require("../../../EditorPlugin/index");
import Scripture from './Scripture'
import Youtube from './Youtube'
import Quiz from './Quiz'

var SC = require("../../../SoundClouder");

// full options list (defaults)
var md = require('markdown-it')({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     true,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
  linkify:      true,        // Autoconvert URL-like text to links
 
  // Enable some language-neutral replacement + quotes beautification
  typographer:  true,
  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',
 
  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externaly.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; },
});

md.use(myMDPlugin, {
  containerClassName: "video-embed"
});
 
md.use(require('markdown-it-container'), 'quiz', {
 
  validate: function(params) {
    return params.trim().match(/^quiz\s+(.*)$/);
  },
 
  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^quiz\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + m[1] + '</summary>\n';
    } else {
      // closing tag 
      return '</details>\n';
    }
  }
});

md.use(require('markdown-it-container'), 'page', {
 
  validate: function(params) {
    return params.trim().match(/^page\s+(.*)$/);
  },
 
  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^page\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + m[1] + '</summary>\n';
    } else {
      // closing tag 
      return '</details>\n';
    }
  }
});
 
//console.log(md.render('::: quiz Love is the Title\n## Who Build the Ark\n1. Noah\n2. Jona\n3. Adam\nanswer: 3\n\n## Who Build the Ark\n1. Noah\n2. job\n3. Jason\nanswer: 2\n:::'));

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