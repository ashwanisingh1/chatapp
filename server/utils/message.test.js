var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',()=>{
  it('should generate correct message',()=>{
    var from='ashwani';
    var text='hi';
    var message=generateMessage(from,text);
    //expect(message.createdAt).toBeA('string');
    expect(message).toContain({from,text});

  });
});
