class FileBuffer {
  
  constructor(context, urls) {  
    this.context = context;
    this.urls = urls;
    this.buffer = [];
    this.isLoaded = false
    this.getBuffer()
  }
  
  loadSound(url, index) {
    let request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    let thisBuffer = this;
    request.onload = function() {
      let audioData = request.response;

      thisBuffer.context
        .decodeAudioData(audioData).then(function(decodedData) {
         thisBuffer.buffer[index] = decodedData;
          if(index == thisBuffer.urls.length-1) {
            thisBuffer.loaded();
          }      
      });

    };
    request.send();
  };
  
  getBuffer() {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index);
    })
  }
  
  loaded() {
    this.isLoaded = true;
  }
  
  getSound(index) {
    return this.buffer[index];
  }

}

export default FileBuffer