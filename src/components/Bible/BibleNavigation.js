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
    }
  }

  render () {

    let previous = null
    let next = null

    if (this.props.previousURL !== null){
      previous = <Link className="be-button-simple-back" to={this.props.previousURL}></Link>
    }

    if (this.props.nextURL !== null){
      next = <Link className="be-button-simple" to={this.props.nextURL}></Link>
    }

    return (
      <nav id="bible-navigation">
      
      {previous}

      <form>
       <input type="text" value={this.state.reference} onChange={this._editReference.bind(this)} />
       <button className="search" onClick={this._updateReference.bind(this)}><MGlass /></button>
      </form>

      {next}

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