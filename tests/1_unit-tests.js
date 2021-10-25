const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();
const ab = 'american-to-british';
const ba = 'british-to-american';

suite('Unit Tests', () => {
  
  test('Translate Mangoes are my favorite fruit. to British English', function(done) {
    assert.equal(translator.test('Mangoes are my favorite fruit.',ab,false),'Mangoes are my favourite fruit.');
    done();
  });
  
  test('Translate I ate yogurt for breakfast. to British English', function(done) {
    assert.equal(translator.test('I ate yogurt for breakfast.',ab,false),'I ate yoghurt for breakfast.');
    done();
  });
  
  test(`Translate We had a party at my friend's condo. to British English`, function(done) {
    assert.equal(translator.test(`We had a party at my friend's condo.`,ab,false),`We had a party at my friend's flat.`);
    done();
  });
  
  test(`Translate Can you toss this in the trashcan for me? to British English`, function(done) {
    assert.equal(translator.test(`Can you toss this in the trashcan for me?`,ab,false),`Can you toss this in the bin for me?`);
    done();
  });
  
  test(`Translate The parking lot was full. to British English`, function(done) {
    assert.equal(translator.test(`The parking lot was full.`,ab,false),`The car park was full.`);
    done();
  });
  
  test(`Translate Like a high tech Rube Goldberg machine. to British English`, function(done) {
    assert.equal(translator.test(`Like a high tech Rube Goldberg machine.`,ab,false),`Like a high tech Heath Robinson device.`);
    done();
  });
  
  test(`Translate To play hooky means to skip class or work. to British English`, function(done) {
    assert.equal(translator.test(`To play hooky means to skip class or work.`,ab,false),`To bunk off means to skip class or work.`);
    done();
  });
  
  test(`Translate No Mr. Bond, I expect you to die. to British English`, function(done) {
    assert.equal(translator.test(`No Mr. Bond, I expect you to die.`,ab,false),`No Mr Bond, I expect you to die.`);
    done();
  });
  
  test(`Translate Dr. Grosh will see you now. to British English`, function(done) {
    assert.equal(translator.test(`Dr. Grosh will see you now.`,ab,false),`Dr Grosh will see you now.`);
    done();
  });
  
  test(`Translate Lunch is at 12:15 today. to British English`, function(done) {
    assert.equal(translator.test(`Lunch is at 12:15 today.`,ab,false),`Lunch is at 12.15 today.`);
    done();
  });
  
  test(`Translate We watched the footie match for a while. to American English`, function(done) {
    assert.equal(translator.test(`We watched the footie match for a while.`,ba,false),`We watched the soccer match for a while.`);
    done();
  });
  
  test(`Translate Paracetamol takes up to an hour to work. to American English`, function(done) {
    assert.equal(translator.test(`Paracetamol takes up to an hour to work.`,ba,false),`Tylenol takes up to an hour to work.`);
    done();
  });
  
  test(`Translate First, caramelise the onions. to American English`, function(done) {
    assert.equal(translator.test(`First, caramelise the onions.`,ba,false),`First, caramelize the onions.`);
    done();
  });
  
  test(`Translate I spent the bank holiday at the funfair. to American English`, function(done) {
    assert.equal(translator.test(`I spent the bank holiday at the funfair.`,ba,false),`I spent the public holiday at the carnival.`);
    done();
  });
  
  test(`Translate I had a bicky then went to the chippy. to American English`, function(done) {
    assert.equal(translator.test(`I had a bicky then went to the chippy.`,ba,false),`I had a cookie then went to the fish-and-chip shop.`);
    done();
  });
  
  test(`Translate I've just got bits and bobs in my bum bag. to American English`, function(done) {
    assert.equal(translator.test(`I've just got bits and bobs in my bum bag.`,ba,false),`I've just got odds and ends in my fanny pack.`);
    done();
  });
  
  test(`Translate The car boot sale at Boxted Airfield was called off. to American English`, function(done) {
    assert.equal(translator.test(`The car boot sale at Boxted Airfield was called off.`,ba,false),`The swap meet at Boxted Airfield was called off.`);
    done();
  });
  
  test(`Translate Have you met Mrs Kalyani? to American English`, function(done) {
    assert.equal(translator.test(`Have you met Mrs Kalyani?`,ba,false),`Have you met Mrs. Kalyani?`);
    done();
  });
  
  test(`Translate Prof Joyner of King's College, London. to American English`, function(done) {
    assert.equal(translator.test(`Prof Joyner of King's College, London.`,ba,false),`Prof. Joyner of King's College, London.`);
    done();
  });
  
  test(`Translate Tea time is usually around 4 or 4.30. to American English`, function(done) {
    assert.equal(translator.test(`Tea time is usually around 4 or 4.30.`,ba,false),`Tea time is usually around 4 or 4:30.`);
    done();
  });
  
  
  
  test(`Highlight translation in Mangoes are my favorite fruit.`, function(done) {
    assert.equal(translator.test(`Mangoes are my favorite fruit.`,ab),`Mangoes are my <span class=\"highlight\">favourite</span> fruit.`);
    done();
  });
    
  test(`Highlight translation in I ate yogurt for breakfast.`, function(done) {
    assert.equal(translator.test(`I ate yogurt for breakfast.`,ab),`I ate <span class=\"highlight\">yoghurt</span> for breakfast.`);
    done();
  });
    
  test(`Highlight translation in We watched the footie match for a while.`, function(done) {
    assert.equal(translator.test(`We watched the footie match for a while.`,ba),`We watched the <span class=\"highlight\">soccer</span> match for a while.`);
    done();
  });
    
  test(`Highlight translation in Paracetamol takes up to an hour to work.`, function(done) {
    assert.equal(translator.test(`Paracetamol takes up to an hour to work.`,ba),`<span class=\"highlight\">Tylenol</span> takes up to an hour to work.`);
    done();
  });
  
});



