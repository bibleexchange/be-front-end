import React from 'react'
var marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

class Markdown extends React.Component {

  render(){

        return <span dangerouslySetInnerHTML={{__html: marked(this.props.line.value)}} />
  }

}

export default Markdown;