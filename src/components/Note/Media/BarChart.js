import React from 'react'

import './BarChart.scss'

class BarChart extends React.Component {
  render(){
        return <ul className="barchart">

        {this.props.percentages.map(function(p,key){

        	let style = {
        		background:"blue repeat-y",
        		width: p.percent + "%"
        	}

        	return <li key={key} style={style}>{p.text}</li>
        })}
		</ul>
  }

}

export default BarChart;