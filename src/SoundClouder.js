var SC = require('soundcloud');

class SoundCloud {

  init(){
    SC.initialize({
      client_id: '2dc887a365f4c737b309f890a7ea8584',
      client_secret:'63e764894f156d7dcc9f5f10adc7703d'
    });

	return this
  }

  searchTags(tags){

	SC.get('/tracks', {
	  q: 'bible_exchange', tags: tags
	}).then(function(tracks) {
	  return tracks;
	});
  }

}

export default SoundCloud
