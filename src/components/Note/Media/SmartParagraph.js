import React from 'react'
import {renderObject, markdown} from '../../Note/NoteUtil'

class SmartParagraph extends React.Component {

  render(){
    let body = this.props.page.media.map(function(v, key){
      if(v !== null){
        return <div key={key} style={v.style} className="media">{renderObject(v)}</div>
      }
      })

        return <div style={{position:"relative"}}>{body}</div>
  }

}

export default SmartParagraph;