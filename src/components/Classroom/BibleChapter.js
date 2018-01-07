import React from 'react'

class BibleChapter extends React.Component {

  render () {
    return (
      <div>
        <h2>{this.props.reference}</h2>

        {this.props.verses.map(function(verse){
          return <blockquote key={verse.id}>{verse.order_by} {verse.body}</blockquote>
        })}
      </div>
    )
  }
}

export default BibleChapter;