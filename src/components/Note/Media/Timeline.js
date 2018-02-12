import React from 'react'
import "./Timeline.scss"

class Timeline extends React.Component {
  render(){
        return <div id="timeline">
      		<div className="timeline">

      		{this.props.events.map(function(event, key){
      			return <div key={key} className={"container "+ event.side}>
			    <div className="content">
			      <h2>{event.date}</h2>
			      <p>{event.description}</p>
			    </div>
			  </div>
      		})}

			</div>
		    </div>
  }

}

export default Timeline;
