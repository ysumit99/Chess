//Unit Testing with Mocha and Chai
const assert = require('chai').assert;
const board = require('../scripts/board');


describe('Test for board', function(){

    let num = '23'; //should fail
    let str = 'someRandomString'; //should pass the test

    //Test1
    it('check that num is numeric', function(){
        //assert is used
        assert.isNumber(num);
    });

    //Test2
    it('some test label', function(){
        //assert is used
        assert.isString(str);
    });

    
});