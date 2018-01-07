import React from 'react'

class EditLine extends React.Component {

  componentWillMount(){

    this.state = {
      newIndex: this.props.index,
      options: [
        {value:"md",display:"Markdown"},
        {value:"h1",display:"h1"},
        {value:"h2",display:"h2"},
        {value:"h3",display:"h3"},
        {value:"h4",display:"h4"},
        {value:"h5",display:"h5"},
        {value:"h6",display:"h6"},
        {value:"ml",display:"Multi-Line"},
        {value:"raw",display:"No Markup"},
        {value:"quiz",display:"Quiz"},
      ]
    }
  }

  render(){

    return <div className="flexbox-container2">
        <div>
        <input hidden name="index" type="text" value={this.props.index} data-action="line.update" data-name="index" data-index={this.props.index} data-old={this.props.index} onChange={this.props.handleChange} />
        </div><div>
        <input type="text" value={this.state.newIndex} onChange={this.handleNewIndex.bind(this)} data-name="index" data-index={this.props.index} data-action="line.update" onBlur={this.props.handleChange}/>
        </div>
        <div>
        <select data-old={this.props.line.markup} value={this.props.line.markup} onChange={this.props.handleChange} data-action="line.update" data-name="markup" data-index={this.props.index} >
          {this.state.options.map(function(o){
            return <option key={o.value} value={o.value}>{o.display}</option>
          })}  
        </select>
        </div>
        <div>

      <textarea name="value" data-old={this.props.line.value} value={this.props.line.value} data-action="line.update" data-name="value" data-index={this.props.index} onChange={this.props.handleChange} />  
        </div>
    </div>
  }
    handleNewIndex(e){
      this.setState({newIndex: e.target.value})
    }  

    handleUpdateNewIndex(e){
      this.props.handleChange(e)
    } 

}

export default EditLine