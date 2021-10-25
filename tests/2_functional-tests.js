const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');



suite('Functional Tests', () => {
  
const ab = 'american-to-british';
const ba = 'british-to-american';
const text = 'Mangoes are my favorite fruit.'
  
  test('Translation with text and locale fields: POST request to /api/translate', function(done) {
    chai.request(server)
        .post('/api/translate')
        .send({text: text, locale:ab})
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.isTrue((res.body.hasOwnProperty('text')));
          assert.isTrue((res.body.hasOwnProperty('translation')));
          done();
        })
  });
  
  test('Translation with text and invalid locale field: POST request to /api/translate', function(done) {
    chai.request(server)
        .post('/api/translate')
        .send({text: text, locale:'invalidInput'})
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.body.error,'Invalid value for locale field');
          done();
        })
  });
  
  test('Translation with missing text field: POST request to /api/translate', function(done) {
    chai.request(server)
        .post('/api/translate')
        .send({locale:ab})
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.body.error,'Required field(s) missing');
          done();
        })
  });
  
  test('Translation with missing locale field: POST request to /api/translate', function(done) {
    chai.request(server)
        .post('/api/translate')
        .send({text:text})
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.body.error,'Required field(s) missing');
          done();
        })
  });
  
  test('Translation with empty text: POST request to /api/translate', function(done) {
    chai.request(server)
        .post('/api/translate')
        .send({text:'',locale:ab})
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.body.error,'No text to translate');
          done();
        })
  });
  
  test('Translation with text that needs no translation: POST request to /api/translate', function(done) {
    chai.request(server)
        .post('/api/translate')
        .send({text:text,locale:ba})
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.body.translation,'Everything looks good to me!');
          done();
        })
  });
  
  
  
});
