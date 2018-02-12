import React from 'react'
import CreateSessionMutation from '../mutations/CreateSessionMutation'
import CreateUserMutation from '../mutations/CreateUserMutation'
import auth from '../auth'

import './LoginSignup.scss'

class LoginSignup extends React.Component {

 componentWillMount(){
    this.state = {
      error: null,
      status: true,
      user: {
        email: "",
        password: ""
      }
    }
  }


  render () {
let error = null

if(this.state.error !== null){
  error = <p style={{color:"red"}}>{this.state.error.code} : {this.state.error.message}</p>
}

    return (
      <div id="login-signup" className={"ready-"+this.state.status}>            
        <div className="spinner" />
        <div className="main">
        {error}
        <h1>Login/Sign Up</h1>
        <form>
          <label>email: </label>
          <input type="text" placeholder="email" value={this.state.user.email} onChange={this.updateEmail.bind(this)}/>
          <label>password: </label>
          <input type="password" placeholder="password" value={this.state.user.password} onChange={this.updatePassword.bind(this)}/>
          <input type="submit" onClick={this.handleLogin.bind(this)} value="login"/>
          <input type="submit" onClick={this.handleSignup.bind(this)} value="create account"/>
        </form>  

        <h2>What is Bible exchange?</h2>
        <iframe style={{width:"100%", minHeight:"400px", frameBorder:"0"}}src="https://player.vimeo.com/video/120753625"></iframe>
        <p>We have so many things that we use when studying our Bibles. What if we put all these things right in the Bible? Bible exchange does exactly that.</p>
              
        </div>
      </div>
    )
  }

  updatePassword = (e) => {
    let newState = this.state
    newState.user.password = e.target.value
    this.setState(newState)
  }
  updateEmail = (e) => {
    let newState = this.state
    newState.user.email = e.target.value
    this.setState(newState)
  }
  handleLogin = (e) => {
    e.preventDefault()
    this._login(this.state.user.email, this.state.user.password)
  }

 handleSignup = (e) => {
    e.preventDefault()
    this._signup(this.state.user.email, this.state.user.password)
  }

  _login = (email,password, callback) => {
     this.setState({status:false})
    CreateSessionMutation(email, password, this._callback)
  }

  _signup= (email,password, callback) => {
     this.setState({status:false})
    CreateUserMutation(email, password, this._signupCallback)
  }

  _callback = (response) => {
    auth.login(response.createSession.viewer.id)
    this.setState({error: response.createSession.error, status:true})
    if(response.createSession.error.code === 200){
      this.props.loginCallback(response)
    }
    
  }

  _signupCallback = (response) => {
    auth.login(response.createUser.viewer.id)
    this.setState({error: response.createUser.error, status:true})
    if(response.createUser.error.code === 200){

      this.props.signupCallback(response)
    }
  }

}

export default LoginSignup;