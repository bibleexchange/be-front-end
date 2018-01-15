import React from 'react'
import './Guitar.scss'
import Buffer from '../../WebAudioAPI/FileBuffer'
import AudioSample from '../../WebAudioAPI/Sources/AudioSample'

class GuitarComponent extends React.Component {

  constructor(props){
    super(props)

    this.guitar = false
    this.preset = 0
    this.context = false
    this.buffer = false

    this.state = {
      options: this.props.options
    }

  }

  componentDidMount(){
    this.context = new (window.AudioContext || window.webkitAudioContext)()
    let sounds = this.state.options.sounds.map(a => a.url);
    this.buffer = new Buffer(this.context, sounds);
    
    let playGuitar = this.playGuitar.bind(this)
    let stopGuitar = this.stopGuitar.bind(this)
    let pauseTrack = this.pauseTrack.bind(this)
    let playTrack = this.playTrack.bind(this)

    let buttons = document.querySelectorAll('.notes .note');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', playGuitar.bind(button));
      button.addEventListener('mouseleave', stopGuitar);
    })

    let audio = this.refs.audio
    let rewind = this.refs.rewind
    let circle = document.querySelector('.circle');

    audio.addEventListener('pause', pauseTrack);
    audio.addEventListener('play', playTrack);

    rewind.addEventListener('click', () => {
      audio.currentTime = 0;
    })
    
    audio.addEventListener('ended', () => {
      pauseTrack();
    });



  }

  render(){
    return <div>
        <nav>
          <div className="controls">
            <div className="progress" />
            Backing track: Shuffle Blues in A
            <a className="rewind" ref="rewind">
              <svg width="26" height="16" viewBox="160 18 26 16" xmlns="http://www.w3.org/2000/svg" className="rewind-icon"><path d="M173.3 26.143l12 6.857V18.778l-12 6.857v-6.857l-12.444 7.11L173.3 33v-6.857z" fill="#A8B5C3" fillRule="evenodd"/></svg>
            </a>
            <a className="play" ref="play" onClick={this.play.bind(this)}>
              <svg width="21" height="24" viewBox="210 14 21 24" xmlns="http://www.w3.org/2000/svg" className="play-icon"><path fill="#A8B5C2" fillRule="evenodd" d="M230.677 25.815L210 37.63V14"/></svg>
              <svg width="21px" height="24px" viewBox="210 14 21 24" xmlns="http://www.w3.org/2000/svg" className="pause-icon">
              <rect id="pause-1" fill="#A8B5C2" fillRule="evenodd" x="210" y="14" width="7" height="24"></rect>
              <rect id="pause-2"  fill="#A8B5C2" fillRule="evenodd" x="224" y="14" width="7" height="24"></rect>
            </svg>
            </a>
          </div>
        </nav>


        <div className="notes">

          {this.state.options.sounds.map(function(s,i){
            return <div key={i} className={s.class} data-note={i}><div>{s.title}<span>{s.subtitle}</span></div></div>
          })}

        </div>

        <div className="guitar">
          <div className="circle"></div>
        </div>

        <audio ref="audio" src={this.state.options.backgroundTrack}></audio>
        <canvas ref="guitarAnalyser" id="guitarAnalyser" ></canvas>
    </div>
  }

  playGuitar(e) {
    let index = parseInt(e.target.dataset.note) + this.preset;
    this.guitar = new AudioSample(this.context, this.buffer.getSound(index), this.state.options);
    this.guitar.play();
  }

  playTrack() {  
    this.refs.play.querySelector('.pause-icon').style.display = "block";
    this.refs.play.querySelector('.play-icon').style.display = "none";
  }

  pauseTrack() {
    this.refs.play.querySelector('.pause-icon').style.display = "none";
    this.refs.play.querySelector('.play-icon').style.display = "block";
  }

  stopGuitar() {
    if(this.guitar){this.guitar.stop();}
  }

  play(){
    let audio = document.querySelector('audio');

     if(audio.paused) {
       audio.play();
       this.playTrack();
     } else {
       audio.pause();
       this.pauseTrack();
     } 

  }

  makeDistortionCurve(){
    this.context.waveShaperNode.curve = 20;
  }

}

export default GuitarComponent