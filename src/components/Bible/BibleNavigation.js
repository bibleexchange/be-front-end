import React from 'react'
import { Link } from 'react-router-dom';
import MGlass from '../Svg/MagnifyingGlass'

class BibleNavigation extends React.Component {

  componentWillMount(){
    this.state = {
      reference: this.props.reference
    }

    localStorage.setItem('reference', this.props.reference)
  }

  componentWillReceiveProps(props){
    if(props.reference !== this.props.reference){
      localStorage.setItem('reference', this.props.reference)
      this.setState({reference: props.reference})
    }
  }

  render () {

    return (
      <nav id="search-all">

      <form>
       <input type="text" value={this.state.reference} onChange={this._editReference.bind(this)} />
       <button className="search" onClick={this._updateReference.bind(this)}><MGlass /></button>
      </form>

      </nav>
    )
  }

  _editReference = (e) => {
    this.setState({reference: e.target.value})
  }

  _updateReference = (e) => {
    this.props.updateReference(this.state.reference)
  }
}

export default BibleNavigation