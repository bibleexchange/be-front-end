import React from 'react'
var myMDPlugin = require("../../../EditorPlugin/index");
var md = require('markdown-it')();
md.use(myMDPlugin, {
  containerClassName: "video-embed"
});

class Body extends React.Component {

  render(){
    return <span dangerouslySetInnerHTML={{__html: this.props.body}} />
  }

}

class Question extends React.Component {

  render(){
    let questionIndex = this.props.index
    let handleOptionSelect = this.props.handleOptionSelect

    return <li>

        {this.props.question}

        <div><Body body={this.props.body} /></div>

        <ul>
      {this.props.options.map(function(opt,key){
        return <li key={key}><input type="radio" value={opt.ref} name={"question_"+questionIndex} onChange={handleOptionSelect} data-question={questionIndex}/> {opt.value}</li>
      })}
      </ul>

      <p className={"passed-"+this.props.response.pass}>[{this.props.answer}] {this.props.response.message}</p>

    </li>

  }

}

class Quiz extends React.Component {

  componentWillMount(){
    let lines = this.props.line.value.split("\n")
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
            return <Question key={i} index={i} question={q.q} response={getResponse(i)} answer={q.answer} options={q.options} body={q.body} handleOptionSelect={handleOptionSelect}/>
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
      //
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

    let data = {
      title: "",
      questions:[],
      options:{}
    }

    let questionIndex = null
    let optionIndex = 0

    lines.map(function(l, index){
      
      if(l.substring(0,2) === "# "){
        data.title = l.replace("# ", "")
      }else if(l.substring(0,3) === "## "){
        optionIndex = 0
        
        if(questionIndex === null){
          questionIndex = 0
        }else{
          questionIndex += 1
        }
        data.questions[questionIndex] = {read: l.replace("## "), options:[], answer:"", body:""}  
      }else if(Number.isNaN(parseInt(l.substring(0,1),10)) === false){

        let ref = l.substring(0,1)
        let value = l.substring(3)

        data.questions[questionIndex].options[optionIndex] = {value:value, ref:ref}
        optionIndex += 1
      }else if(l.includes("ans: ") || l.includes("answer: ")){
        let ans = l.split(":",2)
        data.questions[questionIndex].answer = ans[1].trim()
      }else if(l.substring(0,1) === "{"){

        try {
            data.options = JSON.parse(l)
        } catch(e) {
            let num = e.message.match(/\d+/)[0]
            data.options = {error:"error in parsing json: "+e.message, line:l, near:l.substring(0,num), ...e}
            reportError(data.options)
        }

      }else if(l !== ""){
        data.questions[questionIndex].body += md.render(l)
      }
      return null
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