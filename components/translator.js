const reverseObj = function(obj){
  const newObj={};
  for (let [key, value] of Object.entries(obj)) {
    newObj[value] = key;
  }
  return newObj
}

const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const americanDictionary =  Object.assign({},reverseObj(americanToBritishSpelling),reverseObj(americanToBritishTitles),britishOnly)
const americanDictionaryKeys = Object.keys(americanDictionary);

const britishDictionary =  Object.assign({},americanToBritishSpelling,americanToBritishTitles,americanOnly)
const britishDictionaryKeys = Object.keys(britishDictionary);


class Translator {
  constructor(text){
    this.text = text;
    this.translate = text;
    this.test = function(text,type,highlight=true){
      text = translateText(text,type,highlight);
      /*--
      let translateKeys = britishDictionaryKeys;
      translateKeys.forEach((item,index)=>{
        translateKeys[index] = '(' + item + ')'
      })
      translateKeys = translateKeys.join('|');
      console.log(translateKeys)
      const translatePattern = new RegExp(translateKeys);
      text = text.replace(translatePattern,(match)=>britishDictionary[match]);
      --*/
      return text
    }
  }
}

const translateWord = function(text,type){
  let index = 0;
  let result;
  let textSplit = text.split(' ')
  let translateDictionary,translateKeys,translateTitle
  if(type === 'american-to-british'){
    translateDictionary = britishDictionary;
    translateTitle = americanToBritishTitles;
    translateKeys = britishDictionaryKeys;
    if((/\d+\:\d\d/).test(textSplit[0])){
      return [textSplit[0],textSplit[0].replace(':','.')]
    }
  }
  if(type === 'british-to-american'){
    translateDictionary = americanDictionary;
    translateTitle = reverseObj(americanToBritishTitles);
    translateKeys = americanDictionaryKeys;
    if((/\d+\.\d\d/).test(textSplit[0])){
      return [textSplit[0],textSplit[0].replace('.',':')]
    }
  }
  do{
    translateKeys = translateKeys.filter(item=>item.split(' ')[index]==textSplit[index].toLowerCase())
    index++;
  }while(translateKeys.length>1 || (translateKeys.length!=0 &&index<translateKeys[0].split(' ').length))
    if(index!=1){
      textSplit = textSplit.slice(0,index).join(' ').toLowerCase()
    }else{
      textSplit = textSplit[0].toLowerCase()
    }
  if(translateKeys.length===1&&translateKeys[0]===textSplit){
    if(translateKeys[0] in translateTitle){
      return [translateKeys[0],translateDictionary[translateKeys[0]].charAt(0).toUpperCase() + translateDictionary[translateKeys[0]].substr(1).toLowerCase()]
    }else{
      return [translateKeys[0],translateDictionary[translateKeys[0]]]
    }
  }else{
    return text
  }
}

const translateText = function(text,type,highlight=true){
  if(highlight===true){
    var highlightTag1 = '<span class=\"highlight\">';
    var highlightTag2 = '</span>';
  }else{
    var highlightTag1 = '';
    var highlightTag2 = '';
  }
  let translated = '';
  let translate;
  if((/[?!\.]$/).test(text)){
    text = text.replace(/([?!\.])$/,' $1 ')
  }else{text = text + ' '}
  do{
    translate = translateWord(text,type);
    if (translate === text){
      translated= (translated + (' ') + text.slice(0,text.indexOf(' '))).trim()
      text = text.slice(text.indexOf(' ')+1)
    }else{
      translated= (translated + ' ' + highlightTag1 + translate[1] + highlightTag2).trimStart();
      let reg = new RegExp(translate[0],'i')
      text = text.replace(reg,'').trimStart();
    }
  }while(text.includes(' '))
  let result = (translated + text).trim();
  if((/\s[?!\.]$/).test(result)){
    result = result.replace(/\s([?!\.])$/,'$1')
  }
  return result
}





module.exports = Translator;

