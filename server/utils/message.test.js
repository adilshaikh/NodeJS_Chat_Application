var expect = require('expect');
var {messageGenerator} = require('./message');

describe('Generating Messsages',()=>{
    it('It should generate some message', ()=>{
        var from = 'Dranzer';
        var text = 'Hey This is from Dranzer';
        var message = messageGenerator(from, text)

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text})
    })
})