import React from 'react'

class Youtube extends React.Component {

  render(){
    let id = this.props.url.path.replace("watch?v=","")
    return <div>
          <iframe width="560" height="315" src={"https://www.youtube.com/embed/"+id} frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>   
        </div>
      }

}

export default Youtube;