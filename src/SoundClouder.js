var SC = require('soundcloud');

class SoundCloud {

  init(){
    SC.initialize({
      client_id: '2dc887a365f4c737b309f890a7ea8584',
      client_secret:'63e764894f156d7dcc9f5f10adc7703d',
      redirect_uri: 'http://bible.exchange/soundcloud/callback.html'
    });
  }

  test(){
    SC.get('/user/183/tracks').then(function(tracks){
      alert('Latest track: ' + tracks[0].title);
    });
  }

}

export default SoundCloud