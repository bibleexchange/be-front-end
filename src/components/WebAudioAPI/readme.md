Web Audio API lets us make sound right in the browser. It makes your sites, apps, and games more fun and engaging.


# Getting Started

All audio operations in Web Audio API are handled inside an audio context. Each basic audio operation is performed with audio nodes that are chained together, forming an audio routing graph. Before playing any sound, you'll need to create this audio context. It is very similar to how we would create a context to draw inside with the <canvas> element. Here's how we create an audio context:

var context = new (window.AudioContext || window.webkitAudioContext)();

Safari requires a webkit prefix to support AudioContext, so you should use that line instead of new AudioContext();

Normally the Web Audio API workflow looks like this:

Create audio context -> create source -> connect filter nodes -> connect to destination

There are three types of sources:

1. Oscillator - mathematically computed sounds
2. Audio Samples - from audio/video files
3. Audio Stream - audio from webcam or microphone