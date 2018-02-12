import React from 'react'
import './Loader.scss'

class Loader extends React.Component {

  render() {
  return  <div id="loader"> 
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
          </div>
        }
}

export default Loader