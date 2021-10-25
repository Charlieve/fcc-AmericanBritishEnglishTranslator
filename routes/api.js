'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
    
  //catch all res
  app.use(function logResponseBody(req, res, next) {
  var oldWrite = res.write,
      oldEnd = res.end;

  var chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);

    return oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk)
      chunks.push(chunk);

    var body = Buffer.concat(chunks).toString('utf8');
    console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)} ---> ${body}`);

    oldEnd.apply(res, arguments);
  };

  next();
})
  
  
  
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if(!((typeof req.body.text) === 'string')||!((typeof req.body.locale) === 'string')){
        return res.send({error:'Required field(s) missing'})
      }
      if(req.body.text===''){
        return res.send({error:'No text to translate'});
      }
      if(req.body.locale!=='american-to-british'&&req.body.locale!=='british-to-american'){
        return res.send({error:'Invalid value for locale field'})
      }
      const text = req.body.text;
      const local = req.body.locale;
      let translation= translator.test(text,local);
      if(translation === text){translation = 'Everything looks good to me!'};
      return res.send({text,translation});
    });
};
