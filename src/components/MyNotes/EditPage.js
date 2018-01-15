import React from 'react'
import ReactDOM from 'react-dom'

class EditPage extends React.Component {

  render(){
    return <div>
    <textarea data-name="value" data-index={this.props.index} data-action="page.update" data-old={this.props.page.value} value={this.props.page.value} onChange={this.props.handleChange} />
    </div>
  }

}

export default EditPage