import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import CreateStatementMutation from '../../mutations/CreateStatementMutation';
import { withRouter } from 'react-router-dom';

class Question extends React.Component {
  render () {
    let dataId = this.props.dataId
    let updateAnswer = this.props.updateAnswer
    return <form>
      <label style={{fontWeight:"bold"}}>{this.props.ask}</label>

      {this.props.options.map(function(o,i){
        return <p key={i} ><input type="radio" name={"question"+dataId} data-id={dataId} value={o} onClick={updateAnswer} /> {o}</p>
      })}

    </form>
  }

}

class ActivityQuizThis extends React.Component {

  componentWillMount() {

    this.state ={
      title: this.props.title,
      questions: this.props.questions
    }
  }

  render () {
    let answered = false
    let nextButton = null

    if(this._scoreQuiz(this.state.questions)){
      nextButton = <button onClick={this._iPassedThis.bind(this)}>Next</button>
    }

    let updateAnswer = this.updateAnswer.bind(this)
    return (
      <div>          
          <h1>{this.state.title}</h1>
          <ol>
          {this.state.questions.map(function(q,i){

            if(q.answer === q.answered){answered = true}else{answered = false}

            return <li key={i} className={"answered-" + answered}>
              <Question updateAnswer={updateAnswer} ask={q.ask} options={q.options} dataId={i} />
              </li>
          })}
          </ol>       
        {nextButton}
      </div>
    )
  }

  updateAnswer = (e) => {
    let key = e.target.dataset.id
console.log(e)
    let n = this.state
    n.questions[key].answered = e.target.value
    this.setState(n)
  }

  _scoreQuiz = (questions) => {

    let pass = null

    questions.forEach(function(q){
      if(q.answer !== q.answered){
        pass = false;
      }
    })

    if(pass === null){return true}else{return false}
 }

  _iPassedThis = () => {
    CreateStatementMutation(this.props.track.id, this.props.track.activity.id, "PASSED",this.props.viewer.id, this._statementWasMade.bind(this))
  }

  _statementWasMade = () => {
    console.log("statement was made successfully from ActivityQuizThis.")
  }
}

const FragmentContainer =  createFragmentContainer(ActivityQuizThis, graphql`
  fragment ActivityQuizThis_viewer on Viewer {
    id
    authenticated
  }
  fragment ActivityQuizThis_track on Track {
    id
    activity {
      id
      body
    }
  }
`)

export default withRouter(FragmentContainer);