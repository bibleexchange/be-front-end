import React from 'react'
import EditPage from './EditPage'

class CreateNewPage  extends React.Component {
  render(){
      return <div><EditPage index={this.props.index} page={this.props.page} toggleEdit={this.toggleEdit.bind(this)} handleChange={this.props.handleChange}/></div>
  }
}

export default CreateNewPage