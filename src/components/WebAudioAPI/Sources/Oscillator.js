class Oscillator {
  
  constructor(context, options) {
    this.context = context;
    this.options = options
  }
  
  setup() {

    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();
    this.analyser = this.context.createAnalyser();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.context.destination);

    this.oscillator.type = this.options.type;

    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(this.dataArray);

  }

  play(value, time) {
    this.setup()
    this.oscillator.frequency.value = value;

    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
            
    this.oscillator.start(time);
    this.stop(time);

  }
  
  stop(time) {
    if(this.gainNode){
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
      this.oscillator.stop(time + 1);
    }
  }

  draw(){

    let drawVisual = requestAnimationFrame(this.draw.bind(this));
    let analyser = this.analyser
    let dataArray = this.dataArray
    let bufferLength = this.bufferLength

    this.analyser.getByteTimeDomainData(dataArray);

  }
  
}

export default Oscillator;