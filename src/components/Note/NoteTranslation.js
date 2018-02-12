import {md5} from './NoteUtil'

function translate(key, library){ 

	if(library !== undefined){
	var found = library.find(function(element) {
	  return element.key === key;
	});
	//if(!found) console.log(key, found)
	return found? found.value: false
	}else{
		return false
	}

}

class Translatable{

	constructor(key, entity, propsToIgnore, library){
		this.key = key
		this.entity = entity
		this.ignore = propsToIgnore
		this.library = library
		this.translated = null
		this.init()
	}	

	init(){
		let key = this.key
		let ignore = this.ignore
		let library = this.library
		let properties = null
		let translateEntity = this.translateEntity.bind(this)

		if(typeof this.entity === "string" || typeof this.entity === "number" ){
			let check = translate(key + "." + this.entity, library)
			this.translated = check? check: null
		}else{
			
			if(Array.isArray(this.entity)){
				let properties = []

				this.entity.map(function(ent, i){		
					let prop = new Translatable(key +"."+i, ent, ignore, library)
					properties.push(prop)
				})

			}else if(typeof this.entity === "object"){
				properties = translateEntity(this.entity, ignore, library, key)
			}

			this.entity = properties

		}

		if(this.translated !== null){
			this.entity = this.translated
		}
 
	}

translateEntity (entity, ignore, library, key){
	let properties = Object.assign({},entity)

	Object.entries(this.entity).map(function(prop){
		if(ignore.indexOf(prop[0]) === -1){
			let i = prop[0]
			let x = new Translatable(key+"."+prop[0], prop[1], ignore, library)
			
			if(x.translated !== null){
				properties[i] = null
				properties[i] = x.translated
			}else{
				properties[i] = x.entity
			}
		}
						
	})

	return properties
	}

}

class Note{

	constructor(key, entity, propsToIgnore, library, language){
		this.key = key
		this.entity = entity
		this.ignore = propsToIgnore
		this.library = library
		this.translated = null
		this.language = language
		this.init().meta().pages()
	}	

	init(){
 		return this
	}

	meta(){

		let library = this.library

		this.entity.meta = this.entity.meta.map(function(m){
			let key = "phrase."+m.value
			let check = translate(key, library)
			m.value = check? check: m.value
			return m
		})

		return this
	}

	pages(){

		let library = this.library
		let lang = this.language

		this.entity.pages = this.entity.pages.map(function(page){
			let key = "phrase." + page.title
			let check = translate(key, library)
			page.title = check? check: page.title

			page.media = page.media.map(function(m){

				if(m.translation !== undefined && m.translation.length <= 0){
					m.translation = {}
				}else if(typeof m.translation === "string"){
					m.translation = JSON.parse(m.translation)
				}

				let check = m.translation[lang]
				if(check){
					m.value = check
				}
				
				return m

			})

			return page
		})

		return this
	}

	getNote(){
		let {id, meta, pages, history, translation} = this.entity

			return {
				id,
				meta,
				pages,
				history,
				translation
			}

		}

}

class NoteTranslation {

	constructor(configuredNote, language){
		this.note = configuredNote
		//console.log(configuredNote)
		this.lang = language
		if(language && language !== "eng"){
			this.init()
		}
		
		this.getMeta = this.get.bind(this)
	}

	init(){
		let key = 'note';
		let notePropsToNotTranslate = ["translation","history","style"]
		let library = this.note.translation[this.lang]
		let language = this.lang

		let note = new Note(key, Object.assign({}, this.note), notePropsToNotTranslate, library, language)
		this.note = note.getNote()
	}

   get(key){
    let search = false

     this.note.meta.map(function(ent){
        if(ent.key === key){
          search = ent.value
        }
      })

     if(search === false && key === "title"){
      if(this.note.pages[0] !== undefined && this.note.pages[0].media[0] !== undefined){
      	let value = this.note.pages[0].media[0].value
      	search = value.substring(0,50) + "..."
      }

     }

     return search
    }

}

export default NoteTranslation