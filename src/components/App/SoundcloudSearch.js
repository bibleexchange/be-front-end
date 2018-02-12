import React, { Component } from 'react'

var SC = require('soundcloud');

SC.initialize({
	client_id: '2dc887a365f4c737b309f890a7ea8584',
	client_secret:'63e764894f156d7dcc9f5f10adc7703d'
});

class SoundcloudSearch extends React.Component {

  componentWillMount(){
    this.checkSoundCloud()
    this.state = {
    	audio:[],
    	query:this.props.query
    }
  }

  render(){

  	return <div>
  	        		{this.state.audio.map(function(a, key){
      		if(a.user_id === 130712524){
      		  return <p key={key}>
      			<iframe width="100%" height="20" scrolling="no" frameBorder="no" src={"https://w.soundcloud.com/player/?url="+a.uri+"&amp;color=%23ff5500&amp;inverse=false&amp;auto_play=false&amp;show_user=true"}></iframe>
      			</p>	
      			}	
      		})}		

  	</div>
   
  } 

  checkSoundCloud(){

	let query = this.props.query
	let soundcloudCallback = this.soundcloudCallback.bind(this)
	
	SC.get('/tracks', {
	  q: "bible_exchange: " + query
	}).then(function(tracks) {
	  soundcloudCallback(tracks, query)
	});

    
  }

  soundcloudCallback(tracks, query){
  	console.log("soundcloud reponse for "+query+": ", tracks)
  	this.setState({audio: tracks});
  }

}

export default SoundcloudSearch