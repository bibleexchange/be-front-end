class AudioSample {
  
  constructor(context, buffer, options) {
    this.context = context;
    this.buffer = buffer;
    this.options = options
  }
  
  setup() {

    //Creating the Gain Node
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);


    //Creating Wave Shaper Node
    this.waveShaperNode = this.context.createWaveShaper();
    this.gainNode.connect(this.waveShaperNode);
    this.waveShaperNode.connect(this.context.destination);

    this.gainNode.gain.setValueAtTime(0.8, this.context.currentTime);
    this.waveShaperNode.curve = this.makeDistortionCurve(this.options.distortionCurve);
  }

  play() {
    this.setup()
    this.source.start(this.context.currentTime);
  }
  
  stop() {
    var ct = this.context.currentTime + 0.5;
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, ct);
    this.source.stop(ct);
  }

  makeDistortionCurve( amount ) {
  var k = typeof amount === 'number' ? amount : 0,
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
}
  
}

export default AudioSample;