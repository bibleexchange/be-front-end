import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { withRouter, Link } from 'react-router-dom'
import CreateNoteMutation from '../../mutations/CreateNoteMutation'

class NoteCreator extends React.Component {

componentWillMount(){
    this.state = {
      body: '',
      imageUrl: '',
      title:'',
      verseReference:"",
      tags_string:'',
      returnURL: this.props.location.search.replace("?back=",""),
      verseID: this.props.match.params.verseID
  }
}

componentWillReceiveProps(newProps){
  console.log(newProps)
}

  render () {
    let props = this.props
    return (
              <div className='w-100 pa4 flex justify-center'>
                <div style={{ maxWidth: 400 }} className=''>
                  <input
                    name="verseID"
                    value={this.state.verseID}
                    type="hidden"
                  />

                 <blockquote onClick={this._handleUpdateReference.bind(this)}>{props.bibleVerse.reference} {props.bibleVerse.body}</blockquote>

                 title: <input
                    className='w-100 pa3 mv2'
                    name="title"
                    value={this.state.title}
                    placeholder='Title'
                    onChange={(e) => this.setState({title: e.target.value})}
                  />

                 body: <input
                    className='w-100 pa3 mv2'
                    name="body"
                    value={this.state.body}
                    placeholder='body of note'
                    onChange={(e) => this.setState({body: e.target.value})}
                  />

                 image: <input
                    className='w-100 pa3 mv2'
                    name="imageUrl"
                    value={this.state.imageUrl}
                    placeholder='Image Url'
                    onChange={(e) => this.setState({imageUrl: e.target.value})}
                  />

                  {this.state.body && this.state.imageUrl &&
                    <button className='be-button' onClick={() => this._handleNote(props.viewer.id)}>save</button>
                  }

                  {this.state.imageUrl &&
                    <img 
                      src={this.state.imageUrl} 
                      alt={this.state.body} 
                      className='w-100 mv3' 
                    />
                  }


                    <Link to={this.state.returnURL} className="be-button-red">Cancel</Link>

<hr />
                  change reference <span style={{color:"red"}}>(Will Delete Note Details Entered Above)</span>: <input
                    className='w-100 pa3 mv2'
                    name="verseReference"
                    value={this.state.verseReference}
                    placeholder='Make Note on a Different Scripture Verse'
                    onChange={this._handleEditReference.bind(this)}
                  />
                  <br />

                  <button className="be-button" onClick={this._handleUpdateReference.bind(this)}>update reference</button><br />

                </div>
              </div>
            )
          }

  _handleNote = (viewerId) => {
    const {title, body, verseReference, tags_string} = this.state
    CreateNoteMutation(title, body, verseReference, tags_string, viewerId,  () => this.props.history.replace('/'))
  }

  _handleEditReference = (e) => {
    this.setState({verseReference: e.target.value})
  }

  _handleUpdateReference = (e) => {
    this.props.history.push("/create/"+this.state.verseReference)
  }

}

const FragmentContainer =  createFragmentContainer(NoteCreator, graphql`
  fragment NoteCreator_viewer on Viewer {
    authenticated
  }

  fragment NoteCreator_bibleVerse on BibleVerse {
    id
    reference
    body
  }

`)

export default withRouter(FragmentContainer);