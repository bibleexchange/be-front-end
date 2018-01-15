/* eslint no-unreachable: "off" */
import React from 'react'
import SmartParagraph from './Objects/SmartParagraph'

class RenderPage extends React.Component {

  render(){
    return <div onClick={this.props.onClick} data-index={this.props.index}>
              <SmartParagraph {...this.props} />
            </div>
  }

}

export default RenderPage