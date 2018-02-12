import React from 'react'
import md from '../../../Markdown'
import {makeMeta, figureQuestionTypeAnswer, QuestionTypes} from '../NoteUtil'

class MultipleChoice extends React.Component {

  render(){
    let questionIndex = this.props.index
    let handleOptionSelect = this.props.handleOptionSelect

    return <div>
      {this.props.question}

        {this.props.meta.map(function(meta, key){
          return <p key={key}>{meta.key}: {meta.value}</p>
        })}

        <ul>
        {this.props.options.map(function(opt,key){
          return <li key={key}><input type="radio" value={opt.key} name={"question_"+questionIndex} onChange={handleOptionSelect} data-question={questionIndex}/> {opt.display}</li>
        })}
        </ul>

      <p className={"passed-"+this.props.response.pass}>[{this.props.answer}] {this.props.response.message}</p>
    </div>
  }

}

class FillInTheBlank extends React.Component {

  render(){
    let questionIndex = this.props.index
    let handleOptionSelect = this.props.handleOptionSelect
    console.log(this.props)
    return <div>
      {this.props.question}

        {this.props.meta.map(function(meta, key){
          return <p key={key}>{meta.key}: {meta.value}</p>
        })}

        <ul>
        {this.props.options.map(function(opt,key){
          return <li key={key}><input type="radio" value={opt.key} name={"question_"+questionIndex} onChange={handleOptionSelect} data-question={questionIndex}/> {opt.display}</li>
        })}
        </ul>

      <p className={"passed-"+this.props.response.pass}>[{this.props.answer}] {this.props.response.message}</p>
    </div>
  }

}

class Question extends React.Component {

  render(){

    switch(this.props.data.type){

      case QuestionTypes.FILL_IN_THE_BLANK:
        return <FillInTheBlank {...this.props} />
        break;

      default:
        return <MultipleChoice {...this.props} />
    }
  }

}

class Quiz extends React.Component {

  componentWillMount(){
    let lines = this.props.value.split("\n")
    let data = this.parse(lines, this.props.reportError)

    let score = []

    data.questions.map(function(d,i){
      score[i] = {ans:d.answer, attempts:[]}
      return null
    })

    this.state = {
      lines: lines,
      data: data,
      score: score
    }
    
  }

  render(){
    let handleOptionSelect = this.handleOptionSelect.bind(this)
    let getResponse = this.getResponse.bind(this)
    let finished = null

    if(this.checkIfPassedAll()){
      finished = <button onClick={this.markComplete.bind(this)}>mark complete</button>
    }

        return <div>

          <h1>{this.state.data.title}</h1>
          <ol>
          {this.state.data.questions.map(function(q,i){
            return <Question key={i} index={i} data={q} question={q.title} response={getResponse(i)} answer={q.answer} options={q.options} meta={q.meta} handleOptionSelect={handleOptionSelect}/>
          })}
          </ol>

          {finished}

        </div>
  }

  handleOptionSelect(e){
    
    let choice = e.target.value
    let question =  e.target.dataset.question
    let newState = Object.assign({},this.state)
    newState.score[question].attempts.push(choice)
    this.setState(newState)
  }

  getResponse(questionIndex){
    let ans = this.state.score[questionIndex].ans
    let attempts = this.state.score[questionIndex].attempts

    let response = {
      message:"",
      pass:false
    }

    if(attempts.length <= 0){
      //jj
    }else if(attempts.indexOf(ans) < 0){

      let plural = ""
      if(attempts.length >= 2) {plural = "s"}

      response.message = attempts.length + " wrong attempt"+plural
    }else{

      response.message = "Correctly answered in " + attempts.length + " attempts"
      response.pass = true
    }

    return response
  }

  parse(lines, reportError){

/*
FEATURES:

1. [C] Multiple Choice: wrong answers are prefixed with a tilde (~) and the correct answer is prefixed with an equal sign (=).
Who's buried in Grant's tomb?{-Grant:0 -Jefferson:0 -no one:100}

2. [M] Missing Word format: place the answers where you want the line to appear in the sentence.
Grant is {~buried =entombed ~living} in Grant's tomb.

3. [S]Short Answer: Answers are all prefixed by an equal sign (=), indicating that they are all correct answers. The answers must not contain a tilde.
Who's buried in Grant's tomb?{=no one =nobody}

4. [T]True-False
In this question-type the answer indicates whether the statement is true or false. The answer should be written as {TRUE} or {FALSE}, or abbreviated to {T} or {F}.
Grant is buried in Grant's tomb.{F}

5. [M] Matching: Matching pairs begin with an equal sign (=) and are separated by this symbol "->". There must be at least three matching pairs.
Matching Question.
{
=subquestion1 -> subanswer1
=subquestion2 -> subanswer2
=subquestion3 -> subanswer3
}

6. [N]Numerical: The answer section for Numerical questions must start with a number sign (#). Numerical answers can include an error margin, which is written following the correct answer, separated by a colon. So for example, if the correct answer is anything between 1.5 and 2.5, then it would be written as follows {#2:0.5}. This indicates that 2 with an error margin of 0.5 is correct (i.e., the span from 1.5 to 2.5). If no error margin is specified, it will be assumed to be zero.
When was Ulysses S. Grant born? {#1822}
What is the value of pi (to 3 decimal places)? {#3.1415:0.0005}.
Optionally, numerical answers can be written as a span in the following format:
{#MinimumValue..MaximumValue}

7. [E]Essay: An essay question is simply a question with an empty answer field. Nothing is permitted between the curly braces at all.
Write a short biography of Ulysses S. Grant
{}

8.[] Description: A description "question" has no answer part at all:
The next set of questions will concern arithmetic.

9. Options: In addition to these basic question types, there are the following options: Line Comments, Question Name, Feedback and Percentage Answer Weight:

Line Comments

Comments that will not be imported into Moodle can be included in the text file. This can be used to provide the author with headers or more information about questions. All lines that start with a double forward slash (not counting tabs or spaces) will be ignored by the filter.

// Subheading: Numerical questions below
What's 2 plus 2? {#4}
Question Name

A question name can be specified by placing it first and enclosing it within double colons.

::Kanji Origins::Japanese characters originally came from what country?
{=China}
::Thanksgiving Date::The American holiday of Thanksgiving is 
celebrated on the {~second ~third =fourth} Thursday of November.
If no question name is specified, the entire question will be used as the name by default.

Feedback

Feedback can be included for each answer by following the answer with a number sign (# also known as a hash mark) and the feedback.

What's the answer to this multiple-choice question?
{
~wrong answer#feedback comment on the wrong answer
~another wrong answer#feedback comment on this wrong answer
=right answer#Very good!
}
Who's buried in Grant's tomb?
{
=no one#excellent answer!
=nobody#excellent answer!
}
Grant is buried in Grant's tomb.
{
FALSE#Wrong, no one is buried in Grant's tomb.
#Right, well done.
}
For Multiple Choice questions, feedback is displayed only for the answer the student selected. For short answer, feedback is shown only when students input the corresponding correct answer. For true-false questions, there can be one or two feedback strings. The first is shown if the student gives the wrong answer. The second if the student gives the right answer.

Percentage Answer Weights

*/

    let data = {
      title: "",
      questions:[],
      options:{}
    }

    let titleDone = false

    let question = {type:"", title: "", body:"", options:[], meta:[]}

    lines.map(function(l, index){
      
      if(!titleDone && l.substring(0,2) === "# "){
        data.title = l.replace("# ", "")
        titleDone = true
      }else if(l.substring(0,1) === "$"){
        let t = l.replace("$", "").split(":")
        question.meta.push(makeMeta(t[0],t[1]))
      }else if(l.substring(0,1) === "}"){
        question = figureQuestionTypeAnswer(question)
        data.questions.push(question)
        question = {type:"", title: "", body:"", options:[], meta:[]}
      }else if(l.substring(0,1) === "=" || l.substring(0,1) === "~"){
        question.options.push(l)
      }else if(l.substring(0,1) === "{"){
        question.options = []
      }else{
        question.title = l
      }

    })

   return data


  }

  checkIfPassedAll(){
    let getResponse = this.getResponse.bind(this)
    let answer = true

    this.state.score.map(function(s,i){
      if(!getResponse(i).pass){
        answer = false
      }
      return null
    })

    return answer

  }

//for use for live quiz and not necessarily editor
    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    markComplete(e){
      //console.log("quiz marked complete")
    }

}

export default Quiz;