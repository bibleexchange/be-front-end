import React from 'react'
import { findDOMNode } from "react-dom";
import Oscillator from '../../WebAudioAPI/Sources/Oscillator'

class ElectricWave extends React.Component {

  constructor(props){
    super(props)

    this.wave = false
    this.preset = 0
    this.context = false

    this.state = {
      options: this.props.options
    }

  }

  componentDidMount(){
    this.context = new (window.AudioContext || window.webkitAudioContext)()
    this.create()
  }

  render(){

    let freqs = this.state.options.freqs
    let play = this.play.bind(this)
    
    return <div>
            <button onClick={play}>play</button>
            <audio ref="audio"></audio>
            <canvas ref="oscilloscope" id="oscilloscope" ></canvas>
        </div>
  }

  create() {
    
    this.wave = new Oscillator(this.context, this.state.options);
    var canvas = this.refs.oscilloscope
    var canvasCtx = canvas.getContext("2d");
    let {bufferLength, dataArray} = this.wave.draw()

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();

    var sliceWidth = canvas.width * 1.0 / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * canvas.height / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();

  }

  play(){  
    if(this.wave){
      let now =  this.context.currentTime;
      let wave = this.wave

      this.state.options.freqs.map(function(fre,i){
        wave.play(fre, now + i);
      })
      
    }
  }

  playTrack() {  
    this.refs.audio.querySelector('.pause-icon').style.display = "block";
    this.refs.audio.querySelector('.play-icon').style.display = "none";
  }

  pauseTrack() {
    this.refs.audio.querySelector('.pause-icon').style.display = "none";
    this.refs.audio.querySelector('.play-icon').style.display = "block";
  }

  makeDistortionCurve(){
    this.context.waveShaperNode.curve = 20;
  }

}

export default ElectricWave