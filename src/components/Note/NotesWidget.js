import React, { Component } from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { Link, withRouter } from 'react-router-dom';
import Loader from '../App/Loader'
import './NotesWidget.scss';
import NoteThumbnail from './NoteThumbnail';
import environment from '../../createRelayEnvironment'
import auth from '../../auth'
import ReactDOM from 'react-dom'

class NW extends Component {

  render() {
      let loading = null
      let moreButton = null
      if(this.props.loading && this.props.max > this.props.notes.length){
        loading = <Loader />
      }

      if(this.props.notes.length  > 0 && this.props.notes.length < this.props.max){
        moreButton = <button className="be-button" style={{width:"100%"}} onClick={this.props.handleNextPage}>more ({this.props.notes.length} of {this.props.max})</button>      
      }

      let props = this.props
      
    return (
              <div id='notes-widget' ref="noteswidget">
                {props.notes.map(({node}) =>
                  <NoteThumbnail key={node.id} note={node} viewer={props.viewer} handleSelect={false}/>
                )}
                {loading}
                {moreButton} 
              </div>
    )
  }

}

class NotesWidget extends Component {

  componentWillMount(){
    this.state = {
      loading: false
    }
  }

  componentWillReceiveProps(newProps){
      let s = this.state
      s.loading = false
      this.setState(s)

      window.scrollTop = 1000;
  }

  render() {

      let notes = [];
      let max = 0
      let props = this.props

      if (props.notes !== undefined && props.notes !== null){
          notes = props.notes.edges? props.notes.edges:[]
          max = props.notes.info.totalCount
      }

    return <NW loading={this.state.loading} viewer={props.viewer} max={max} notes={notes} handleNextPage={this.handleNextPage.bind(this)}/>
  }

 handleNextPage(e){
    let s = Object.assign({},this.state)
    s.loading = true
    this.setState(s)
    this.props.moreNotes(e)
  }

}

export default createFragmentContainer(NotesWidget, graphql`
  fragment NotesWidget_viewer on Viewer {
    ...NoteThumbnail_viewer
    authenticated
  }

 fragment NotesWidget_notes on NoteConnection {
         info {
         totalCount
         perPage
         totalPagesCount
         currentPage
       }
         pageInfo{
           hasNextPage
           endCursor
         }
         edges {
           cursor
           node {
             id
             title
             body
             tags
             ...NoteThumbnail_note
           }
         }
      }

`)