import React from 'react'
import EditLine from './EditLine'
import RenderLine from './RenderLine'

class CreateNewLine  extends React.Component {

componentWillMount(){
    this.state = {
      edit : true
    }
  }

  render(){

    if(this.state.edit){
      return <div><EditLine index={this.props.index} line={this.props.line} toggleEdit={this.toggleEdit.bind(this)} handleChange={this.props.handleChange}/></div>
    }else{
      return <div><button onClick={this.toggleEdit.bind(this)}>edit</button><RenderLine line={this.props.line}/></div>
    }
  }

  toggleEdit(e){
    this.setState({edit: !this.state.edit})
  }
}

export default CreateNewLine