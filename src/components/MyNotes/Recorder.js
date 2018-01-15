import React from 'react'
import { findDOMNode } from "react-dom";
import Guitar from './Objects/Guitar'
import ElectricWave from './Objects/ElectricWave'

/*
function voiceMute() { // toggle to mute and unmute sound
  if(mute.id == "") {
    gainNode.gain.value = 0; // gain set to 0 to mute sound
    mute.id = "activated";
    mute.innerHTML = "Unmute";
  } else {
    gainNode.gain.value = 1; // gain set to 1 to unmute sound
    mute.id = "";    
    mute.innerHTML = "Mute";
  }
}

function makeDistortionCurve(amount) { // function to make curve shape for distortion/wave shaper node to use
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

function visualize(stream) {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  var visualSetting = visualSelect.value;
  console.log(visualSetting);

  if(visualSetting == "sinewave") {
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount; // half the FFT value
    var dataArray = new Uint8Array(bufferLength); // create an array to store the data

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {

      drawVisual = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray); // get waveform data and put it into the array created above

      canvasCtx.fillStyle = 'rgb(200, 200, 200)'; // draw wave with canvas
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      canvasCtx.beginPath();

      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;

      for(var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
    };

    draw();

  } else if(visualSetting == "off") {
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.fillStyle = "red";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  }

}

function voiceChange() {
  distortion.curve = new Float32Array;
  biquadFilter.gain.value = 0; // reset the effects each time the voiceChange function is run

  var voiceSetting = voiceSelect.value;
  console.log(voiceSetting);

  if(voiceSetting == "distortion") {
    distortion.curve = makeDistortionCurve(400); // apply distortion to sound using waveshaper node
  } else if(voiceSetting == "biquad") {
    biquadFilter.type = "lowshelf";
    biquadFilter.frequency.value = 1000;
    biquadFilter.gain.value = 25; // apply lowshelf filter to sounds using biquad
  } else if(voiceSetting == "off") {
    console.log("Voice settings turned off"); // do nothing, as off option was chosen
  }

}
*/

class Analyser extends React.Component {

  componentDidMount(){
    //this.updateCanvas()
  }

  render(){
    return <canvas ref="analyser" className={this.props.className} {...this.props.options} />
  }

  updateCanvas(){
    const ctx = this.refs.analyser.getContext('2d')
    ctx.putImageData(this.props.data,0,0)
  }

}

class Audio extends React.Component {

  static defaultProps = {
    poster: null,
    src:null,
    width:640,
    height:360,
    className: 'video',
    controls: true,
    autoPlay:false,
    preload: 'auto'
  }

  constructor(props){
    super(props)
    this.setSource = this.setSource.bind(this)
  }

  componentDidMount(){
    //this.createVisualization()
  }


  render(){

   let guitarOptions = {
        distortionCurve: 5,
        backgroundTrack:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/Shuffle_A.mp3",
        sounds: this.props.sounds? this.props.sounds:[
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D7.mp3', class:"note", title:"D", subtitle:"7"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G4.mp3', class:"note", title:"G", subtitle:"4"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A4.mp3', class:"note key", title:"A", subtitle:"4"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C5.mp3', class:"note", title:"C", subtitle:"5"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D5.mp3', class:"note", title:"D", subtitle:"5"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/E5.mp3', class:"note", title:"E", subtitle:"5"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G5.mp3', class:"note", title:"G", subtitle:"5"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A5.mp3', class:"note key", title:"A", subtitle:"5"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C6.mp3', class:"note", title:"C", subtitle:"6"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D6.mp3', class:"note", title:"D", subtitle:"6"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D%236.mp3', class:"note", title:"D", subtitle:"#6"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/E6.mp3', class:"note", title:"e", subtitle:"6"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G6.mp3', class:"note", title:"G", subtitle:"6"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A6.mp3', class:"note key", title:"A", subtitle:"6"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C7.mp3', class:"note", title:"C", subtitle:"7"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D7.mp3', class:"note", title:"D", subtitle:"7"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G4.mp3', class:"note", title:"G", subtitle:"4"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A4.mp3', class:"note key", title:"A", subtitle:"4"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C5.mp3', class:"note", title:"C", subtitle:"5"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D5.mp3', class:"note", title:"D", subtitle:"5"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_E5.mp3', class:"note", title:"E", subtitle:"5"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G5.mp3', class:"note", title:"G", subtitle:"5"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A5.mp3', class:"note key", title:"A", subtitle:"5"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C6.mp3', class:"note", title:"C", subtitle:"6"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D6.mp3', class:"note", title:"D", subtitle:"6"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D%236.mp3', class:"note", title:"D", subtitle:"#6"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_E6.mp3', class:"note", title:"E", subtitle:"6"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G6.mp3', class:"note", title:"G", subtitle:"7"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A6.mp3', class:"note key", title:"A", subtitle:"7"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C7.mp3', class:"note", title:"C", subtitle:"7"},
    {url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D7.mp3', class:"note", title:"D", subtitle:"7"}
        ]
      }

      let eOptions = {
        freqs: [261.63,293.66,329.63,349.23,392.00, 440.00, 493.88, 523.25],
        type: 'sine'
      }

    return <div>
            <button onClick={this.setSource}>audio</button>

            <Guitar options={guitarOptions}/>

            <ElectricWave options={eOptions}/>
            
            <audio 
              ref="audio"
              poster={this.props.poser} 
              src={this.props.src} 
              width={this.props.width} 
              height={this.props.height} 
              className={this.props.className} 
              controls={this.props.controls} 
              autoPlay={this.props.autoPlay} 
              preload={this.props.preload}
              />
              <canvas ref="analyserCanvas" id="analyzer" ></canvas>
            </div>
  }

setSource(){

/*
  navigator.mediaDevices.getUserMedia({audio: true}).then(function(mediaStream){

    node.srcObject = mediaStream;
    node.play();

/*
    let mediaRecorder = new MediaRecorder(mediaStream)

    mediaRecorder.start(10000)
    console.log(mediaRecorder.state, "recorder started")

    mediaRecorder.ondataavailable = function(e){
      let n = Object.assign({},state)
      n.clips.push(e.data)
      setState(n)
    }
*/
/*
    let context = new AudioContext();
    let source = context.createMediaStreamSource(mediaStream)
    let processor = context.createScriptProcessor(16384,1,1);
    source.connect(processor)
    processor.connect(context.destination)

    processor.onaudioprocess = function(e){
      console.log(e.inputBuffer)
    }
*//*
   }).catch(function(e){
    console.log(e)
   })
*/
}

  oscil(){

  }

}

class Canvas extends React.Component {

  componentDidMount(){
    this.updateCanvas()
  }

  render(){
    return <canvas id="canvas" ref="canvas" className={this.props.className} width={this.props.height} height={this.props.height} />
  }

  updateCanvas(){
    const ctx = this.refs.canvas.getContext('2d')
    ctx.putImageData(this.props.data,0,0)
  }
}

class Photo extends React.Component {

  static defaultProps = {
    width: "640",
    height: "480",
    className:"canvas"
  }

  render(){
    return <canvas id="canvas" className={this.props.className} width={this.props.height} height={this.props.height} />
  }

}

class Video extends React.Component {

  static defaultProps = {
    poster: null,
    src:null,
    width:640,
    height:360,
    className: 'video',
    controls: true,
    autoPlay:false,
    preload: 'auto'
  }

  render(){
    return <video 
      poster={this.props.poser} 
      src={this.props.src} 
      width={this.props.width} 
      height={this.props.height} 
      className={this.props.className} 
      controls={this.props.controls} 
      autoPlay={this.props.autoPlay} 
      preload={this.props.preload} 
      />
  }

}

class Recorder extends React.Component {

 componentWillMount() {

    let constraints = {
      audio: true,
      video: true
    }

    this.state ={
      m: null,
      constraints: constraints,
      audio: {
        constraints: {
          audio: true,
          video:false,
          loop: false,
          autoplay:false
        },
        options:{
          width: 640,
          height: 75,
          className:"analyser"
        }
      },
      video: {
        height: 640,
        width: 480,
        className: "video",
        poster: "/assets/images/logo.png",
        autoPlay:true
      },
      canvases: [], 
      clips:[]
      }

  }

  render(){

    return <div>
      <nav style={{width:"100%"}}>
        <button onClick={this.loadVideo.bind(this)}>video+audio</button>
        <button onClick={this.snap.bind(this)}>take picture</button>
      </nav>

      {/*<input type="file" accept="audio/*" capture />*/}
      <Audio />      
       
       {/*
      <button ref="mute" onClick={voiceMute}>mute</button>
      <Analyser ref="analyser" options={this.state.audio.options}/>

      <Video ref="videoplayer" poster={this.state.video.poster} className={this.state.video.className} autoPlay={this.state.video.autoPlay}/>

      <Photo ref="snap"/>

      {this.state.canvases.map(function(c, key){
        return <Canvas width="480" height="640" key={key} data={c} />
      })}
    */}
      </div>
  }

  snap(){

    let {width, height, className} = this.props
    let video = findDOMNode(this.refs.videoplayer)
    let canvas = findDOMNode(this.refs.snap)
    if(!canvas){return;}
    let context = canvas.getContext('2d')
    context.drawImage(video, 0,0,640,480);
    let newState = Object.assign({}, this.state)
    newState.canvases.push(context.getImageData(0,0,640,480))
    this.setState(newState)

  }

 loadVideo(){
  //if(this.video || !this.props.src){return;}
  let {width, height, className} = this.state.video
  let node = findDOMNode(this.refs.videoplayer)

  if(!node){return;}

  navigator.mediaDevices.getUserMedia(this.state.constraints).then(function(mediaStream){
    node.width = width
    node.height = height
    node.className = className
    node.srcObject = mediaStream;
    node.play();
   }).catch(function(e){
    console.log(e)
   })

}

record(){

}

}

export default Recorder