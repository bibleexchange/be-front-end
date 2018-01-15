
//extending the array so that you can find a prop's value by passing a key
//Name: get

if (!Array.prototype.get) {
  Array.prototype.get = function(key) {
  	let value = null

    this.map(function(m){
    	  	
      if(m.key === key){
      	value = m.value
      }else{
      	return null
      }
    })
    return value
  }
}