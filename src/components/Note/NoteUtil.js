import React from 'react'
import Scripture from './Media/Scripture'
import Youtube from './Media/Youtube'
import Quiz from './Media/Quiz'
import Text from './Media/Text'
import Timeline from './Media/Timeline'
import BarChart from './Media/BarChart'
import ImageMap from './Media/ImageMap'
import NoteTranslation from './NoteTranslation'
import md from '../../Markdown'

export function translateNote(rawNote, lang){
  let config = configure(rawNote)
  //console.log(config)
  let translation = new NoteTranslation(config, lang)
  return translation
}

export const MediaTypes = {
  scripture: "scripture", 
  youtube: "youtube", 
  quiz:"quiz", 
  text:"text", 
  markdown: "md",
  timeline:"timeline",
  barchart:"barchart",
  imagemap:"imagemap"
}
 
//console.log(md.render('::: quiz Love is the Title\n## Who Build the Ark\n1. Noah\n2. Jona\n3. Adam\nanswer: 3\n\n## Who Build the Ark\n1. Noah\n2. job\n3. Jason\nanswer: 2\n:::'));

function md5cycle(x, k) {
var a = x[0], b = x[1], c = x[2], d = x[3];

a = ff(a, b, c, d, k[0], 7, -680876936);
d = ff(d, a, b, c, k[1], 12, -389564586);
c = ff(c, d, a, b, k[2], 17,  606105819);
b = ff(b, c, d, a, k[3], 22, -1044525330);
a = ff(a, b, c, d, k[4], 7, -176418897);
d = ff(d, a, b, c, k[5], 12,  1200080426);
c = ff(c, d, a, b, k[6], 17, -1473231341);
b = ff(b, c, d, a, k[7], 22, -45705983);
a = ff(a, b, c, d, k[8], 7,  1770035416);
d = ff(d, a, b, c, k[9], 12, -1958414417);
c = ff(c, d, a, b, k[10], 17, -42063);
b = ff(b, c, d, a, k[11], 22, -1990404162);
a = ff(a, b, c, d, k[12], 7,  1804603682);
d = ff(d, a, b, c, k[13], 12, -40341101);
c = ff(c, d, a, b, k[14], 17, -1502002290);
b = ff(b, c, d, a, k[15], 22,  1236535329);

a = gg(a, b, c, d, k[1], 5, -165796510);
d = gg(d, a, b, c, k[6], 9, -1069501632);
c = gg(c, d, a, b, k[11], 14,  643717713);
b = gg(b, c, d, a, k[0], 20, -373897302);
a = gg(a, b, c, d, k[5], 5, -701558691);
d = gg(d, a, b, c, k[10], 9,  38016083);
c = gg(c, d, a, b, k[15], 14, -660478335);
b = gg(b, c, d, a, k[4], 20, -405537848);
a = gg(a, b, c, d, k[9], 5,  568446438);
d = gg(d, a, b, c, k[14], 9, -1019803690);
c = gg(c, d, a, b, k[3], 14, -187363961);
b = gg(b, c, d, a, k[8], 20,  1163531501);
a = gg(a, b, c, d, k[13], 5, -1444681467);
d = gg(d, a, b, c, k[2], 9, -51403784);
c = gg(c, d, a, b, k[7], 14,  1735328473);
b = gg(b, c, d, a, k[12], 20, -1926607734);

a = hh(a, b, c, d, k[5], 4, -378558);
d = hh(d, a, b, c, k[8], 11, -2022574463);
c = hh(c, d, a, b, k[11], 16,  1839030562);
b = hh(b, c, d, a, k[14], 23, -35309556);
a = hh(a, b, c, d, k[1], 4, -1530992060);
d = hh(d, a, b, c, k[4], 11,  1272893353);
c = hh(c, d, a, b, k[7], 16, -155497632);
b = hh(b, c, d, a, k[10], 23, -1094730640);
a = hh(a, b, c, d, k[13], 4,  681279174);
d = hh(d, a, b, c, k[0], 11, -358537222);
c = hh(c, d, a, b, k[3], 16, -722521979);
b = hh(b, c, d, a, k[6], 23,  76029189);
a = hh(a, b, c, d, k[9], 4, -640364487);
d = hh(d, a, b, c, k[12], 11, -421815835);
c = hh(c, d, a, b, k[15], 16,  530742520);
b = hh(b, c, d, a, k[2], 23, -995338651);

a = ii(a, b, c, d, k[0], 6, -198630844);
d = ii(d, a, b, c, k[7], 10,  1126891415);
c = ii(c, d, a, b, k[14], 15, -1416354905);
b = ii(b, c, d, a, k[5], 21, -57434055);
a = ii(a, b, c, d, k[12], 6,  1700485571);
d = ii(d, a, b, c, k[3], 10, -1894986606);
c = ii(c, d, a, b, k[10], 15, -1051523);
b = ii(b, c, d, a, k[1], 21, -2054922799);
a = ii(a, b, c, d, k[8], 6,  1873313359);
d = ii(d, a, b, c, k[15], 10, -30611744);
c = ii(c, d, a, b, k[6], 15, -1560198380);
b = ii(b, c, d, a, k[13], 21,  1309151649);
a = ii(a, b, c, d, k[4], 6, -145523070);
d = ii(d, a, b, c, k[11], 10, -1120210379);
c = ii(c, d, a, b, k[2], 15,  718787259);
b = ii(b, c, d, a, k[9], 21, -343485551);

x[0] = add32(a, x[0]);
x[1] = add32(b, x[1]);
x[2] = add32(c, x[2]);
x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
a = add32(add32(a, q), add32(x, t));
return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
let txt = '';
var n = s.length,
state = [1732584193, -271733879, -1732584194, 271733878], i;
for (i=64; i<=s.length; i+=64) {
md5cycle(state, md5blk(s.substring(i-64, i)));
}
s = s.substring(i-64);
var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
for (i=0; i<s.length; i++)
tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
tail[i>>2] |= 0x80 << ((i%4) << 3);
if (i > 55) {
md5cycle(state, tail);
for (i=0; i<16; i++) tail[i] = 0;
}
tail[14] = n*8;
md5cycle(state, tail);
return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) { /* I figured global was faster.   */
var md5blks = [], i; /* Andy King said do it this way. */
for (i=0; i<64; i+=4) {
md5blks[i>>2] = s.charCodeAt(i)
+ (s.charCodeAt(i+1) << 8)
+ (s.charCodeAt(i+2) << 16)
+ (s.charCodeAt(i+3) << 24);
}
return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
var s='', j=0;
for(; j<4; j++)
s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
+ hex_chr[(n >> (j * 8)) & 0x0F];
return s;
}

function hex(x) {
for (var i=0; i<x.length; i++)
x[i] = rhex(x[i]);
return x.join('');
}

export function md5(s) {
return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
return (a + b) & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
function add32(x, y) {
var lsw = (x & 0xFFFF) + (y & 0xFFFF),
msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
}

export function makeMedia(index,markup, value, style, translation){
  return {
    index: index? index:0,
    markup: markup? markup:"md",
    value: value? value:"",
    style: style? style:{},
    translation: translation? translation : {}
  }
}

export function makePage(index, title, media, style){
  return {
    index: index? index:0,
    title: title? title:"Add Title",
    media:media? media:[makeMedia()],
    style:style? style:{}
  }
}


export function makeMeta(key, value){
  return {
    key: key? key:0,
    value: value? value:""
  }
}

class Config {
  constructor(id, meta, pages, history, style, translation){
    this.id = id? id:0
    this.meta = meta? meta:[]
    this.pages = pages? pages:[]
    this.history = history? history:[]
    this.style = style? style:{}
    this.translation = translation? translation:{}
  }

   get(key){
    let search = false
     this.meta.map(function(ent){
        if(ent !== undefined && ent.key === key){
          search = ent.value 
        }
      })

     if(search === false && key === "title" && this.pages.length >= 1){
      let value = this.pages[0].media[0].value
      search = value.substring(0,50) + "..."
     }

     return search
    }
}

export function configure(note){

  let config = new Config()

  if(note !== null && note.body !== null && note.body !== undefined){
      //console.log("### note body is not null")

      if(note.body.substring(0,1) === "{"){
        //console.log("### note body is an object")

        try {
          let body = JSON.parse(note.body)

          if(body.note !== "" && body.note !== undefined){
            config = Object.assign(config, body.note)
          }else{
            config = Object.assign(config, body)
          }
          
        }

        catch(e){
          console.log(e)
          let media = makeMedia(undefined, "markup", e.message + "!: " + note.body)
          let page = makePage(undefined, note.body.substring(0,50), [media])
          config.pages.push(page)
        }

        //console.log("### config pages", config.pages)
        if(config.pages !== undefined){
          let newPages = config.pages

          config.pages.map(function(p, i){

            if(p.media === undefined && p.value !== undefined){
              newPages[i].media = JSON.parse(p.value)
              delete newPages[i].value
            }
          })

          config.pages = newPages
        }

        if(config.lines !== undefined){
          console.log('from lines')

          let media = []

          config.lines.map(function(l){
            media.push(makeMedia(undefined,undefined, JSON.stringify(l)))
          })

          console.log(config.lines,media,note)

          let firstPage = makePage(0, "First Page", media)
          config.pages = [firstPage]
          delete config.lines
        }

        if(config.text !== undefined){
          
          let media = [
            makeMedia(undefined,undefined, config.text)
          ]

          let page = makePage(0, "", media)
          config.pages.push(page)
        }

        if(config.meta === undefined){config.meta = []}
        if(config.links !== undefined){config.meta.push({key:"links", value:config.links}) }
        if(config.tags !== undefined){
          let configTags = []

          if(typeof config.tags === "string"){
            configTags = config.tags.split("#")
          }else{
            configTags = config.tags
          }

          let tags = [ ...new Set(note.tags.concat(configTags))]

          config.meta.push({key:"tags", value:tags});
          delete config.tags
        }

        config.pages.map(function(p){
          return p.media.map(function(m){
                if(m.translation === undefined){
                  m.translation = {}
                }else if(typeof m.translation === "string"){
                  m.translation = JSON.parse(m.translation)
                }
                return m
          })
        })

      }else{
          let firstPage = makePage(0, "New Page", [makeMedia("text",note.body)], {})
          config.pages = [firstPage]
          delete config.lines
          config.meta.push(makeMeta("title", note.title))
          config.meta.push(makeMeta("tags", ""))
      }
      
    }

        if(config.get("scripture") === null || config.get("scripture") === false){
          if(note !== null){
            config.meta.push(makeMeta("scripture", note.verse.reference))
          }
          
        }

        if(config.get("title") === null || config.get("title") === false){

          let value = null

          if(note !== null && note.title !== null){value = note.title;}
          else if(config.title !== undefined){value = config.title; config.title = undefined;}
          else if(config.text !== undefined){value = config.text.substring(0,50)+"... ";}
          else if(note !== null){value = note.body.substring(0,50)+"... "; }

          config.meta.push(config.meta[0])
          config.meta.push(makeMeta("title", value))
        }

       if(config.get("credit") === null || config.get("credit") === false){
        if(note !== undefined && note !== null && note.author !== undefined){config.meta.push({key:"credit", value:note.author.name})}
        }


    return config
	}

  export function gravatarHash(email){
    return  md5( email.trim().toLowerCase() );
  }

export function move(old_index, new_index, array) {
    if (new_index >= array.length) {
       /* var k = new_index - array.length;
        while ((k--) + 1) {
            array.push(undefined);
        }
        */

        new_index = array.length
    }
    array.splice(new_index, 0, array.splice(old_index, 1)[0]);

    return array;
};

  export function parseURL(string){

    let url = {
      protocol: "",
      domain:"",
      path:""
    }

    let protocol = "http:";

    if(string.includes(protocol)){
      string = string.replace(protocol,"")
    }else{
      protocol = "https:"
      if(string.includes(protocol)){
        string = string.replace(protocol,"")
        
      }

    }
    string = string.replace("//","")

    url.protocol = protocol.replace(":","")

    string = string.split("/")
    
    let domain = string[0].split(".")

    if(domain.length === 3){
      url.subdomain = domain[0]
      url.domain = domain[1]
      url.tld = domain[2]
    }else if(domain.length === 2){
      url.subdomain = "www"
      url.domain = domain[0]
      url.tld = domain[1]
    }

    url.path = string[1]

    return url

  }

  export function  renderObject(obj){

    let markup = obj.type
    if(markup === undefined){markup = obj.markup }

    switch(markup){

    case "embed": {

        let url = parseURL(obj.value)

        if(url.domain === "youtube"){
          return <Youtube {...obj} url={url}/>
        }
    break  
    }
    case "scripture": 
      return <Scripture {...obj}/>
      break
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return <obj.markup>{this.props.line.value}</obj.markup>
      break
    case "md":
      return <Text obj={obj} />
      break
    case "raw":
      return <div dangerouslySetInnerHTML={{__html: obj.value}} />
      break
    case "quiz":
      return <Quiz {...obj} />
      break
    case "timeline":
      return <Timeline events={JSON.parse(obj.value)} {...obj} />
      break
    case "barchart":
      return <BarChart percentages={JSON.parse(obj.value)} {...obj} />
      break
    case "imagemap":
      return <ImageMap image={JSON.parse(obj.value)} {...obj} />
      break

    default:
        return <p>{obj.value}</p>

    }       
      
  }

export function markdown(value){
  return md.render(value)
}

function getOptionFeedBack(option){
  let x = option.split("#",2)
  let feedback = null

      if(x.length === 2){
        feedback = x[1]
      }else{
        feedback = null
      }

      return feedback

}

function testIfShortAnswer(options){
  
  let answer = true
  options.map(function(opt){
    if(opt.sym !== "="){answer = false}
  })
  return answer
}

function testIfMultipleChoice(options){
  let answer = false
  options.map(function(opt){
    if(opt.sym === "~"){answer = true}
  })
  return answer
}

function scanRawOption(opt){

  let option = {key:"",display:"", feedback:"",score:0, sym:""}
  
  option.feedback = getOptionFeedBack(opt)
  option.sym = opt.substring(0,1)
  
  let q = opt.split("#",2)[0]
  
  option.display = q.replace("=","").replace("~","")
  option.key = q.replace("=","").replace("~","").toLowerCase()

  if(option.sym === "="){
    option.score = 100
  }else{
    option.score = 0
  }

  return option

}

function scanAllOptions(options){
  let opts = []

  options.map(function(o,i){
     opts.push(scanRawOption(o))
  })

  return opts
}

export const QuestionTypes = {
  DESCRIPTION: "DESCRIPTION", 
  TRUE_FALSE: "TRUE_FALSE", 
  FILL_IN_THE_BLANK:"FILL_IN_THE_BLANK", 
  SHORT_ANSWER:"SHORT_ANSWER", 
  MULTIPLE_CHOICE:"MULTIPLE_CHOICE"
}

export function figureQuestionTypeAnswer(question){
  
  //Figure Type then Answer
  question.options = scanAllOptions(question.options)

  //Test if Desription only
  if(question.options.length <= 0){
    question.type = QuestionTypes.DESCRIPTION
  }else{

    //TEST IF TRUE OR FALSE QUESTION
    if(question.options[0].key === "true" || question.options[0].key === "false"){
      question.type = "TRUE_FALSE"

      question.options.map(function(o,i){

        if(o.sym === "="){
          question.answer = o.key
          o.score = 100
        }
        
        question.options[i] = o
      })

      // TEST IF FILL_IN_THE_BLANK
    }else if(question.title.indexOf("___") >= 0){
        question.type = QuestionTypes.FILL_IN_THE_BLANK
        question.answer = []
        question.options.map(function(o,i){
          question.answer.push(o.key)
          o.score = 100
          question.options[i] = o
        })
      // TEST IF SHORT ANSWER
    }else if(testIfShortAnswer(question.options)){
        question.type = QuestionTypes.SHORT_ANSWER
        question.answer = []

        question.options.map(function(o,i){
          question.answer.push(o.key)
          o.score = 100
          question.options[i] = o
        })
      // TEST IF MULTIPLE CHOICE
    }else if(testIfMultipleChoice(question.options)){
        question.type = QuestionTypes.MULTIPLE_CHOICE
        question.answer = ""

        question.options.map(function(o,i){
          
          if(o.sym === "="){
            question.answer = o.key
          }

          question.options[i] = o
        })

    }else{
      question.type = QuestionTypes.DESCRIPTION
      question.answer = null
    }
  }
  return question

}

