import React from 'react'
import SmartParagraph from '../Note/Media/SmartParagraph'

class RenderPage extends React.Component {

  render(){
    return <div className="rendered-page" onClick={this.props.onClick} data-index={this.props.index}>
              <SmartParagraph {...this.props} />
            </div>
  }

}

export default RenderPage