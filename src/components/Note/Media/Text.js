import React from 'react'
import {renderObject, markdown} from '../../Note/NoteUtil'

class Text extends React.Component {

  componentDidMount(){
    //console.log(this.refs)
    //<span key={k} className="comment" onClick={function(){alert(cm.value)}}>+</span>
  }

  render(){

      let newValue = this.props.obj.value
      let commentAtPosition = this.commentAtPosition.bind(this)

      if(this.props.obj.comments !== undefined){

        let nV = newValue.split("")
        newValue = ""

        let body = nV.map(function(c,i){
            let coms = null
            if(coms = commentAtPosition(i)){
              newValue += c + "<ul class='comments'>"+coms.map(function(oneC){
                return "<li>"+oneC.value+"</li>"
              })+"</ul>"
            }else{
              newValue += c
            }
          })

        return <div dangerouslySetInnerHTML={{__html: markdown(newValue)}} />

      }else{
        newValue = markdown(newValue)
        return <span dangerouslySetInnerHTML={{__html: markdown(newValue)}} />
      }

  }

  commentAtPosition(position){
    let comments = this.props.obj.comments
    let coms = []

    let check = comments.map(function(c){
      if(c.position === position){coms.push(c); }
    })

   if(coms.length <= 0){
    return false
   }else{
    return coms
   }

  }

}

export default Text;