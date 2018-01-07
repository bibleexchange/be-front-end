import React from 'react'
import EditLine from './EditLine'
import RenderLine from './RenderLine'

class DocLine extends React.Component {

  render(){
    if(this.props.edit){
      return <div>
        <EditLine line={this.props.line} index={this.props.index} handleChange={this.props.handleChange} reportError={this.props.reportError}/>
      </div>
    }else{
      return <div className="value"><RenderLine line={this.props.line}  index={this.props.index} options={this.props.options} reportError={this.props.reportError}/></div>
    }
  }

}

export default DocLine