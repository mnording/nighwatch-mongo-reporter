(function () {
    'use strict';
    var assert = require('assert');
    var MongoReporter = require("../index.js");
    describe('test', function () {
            it('shoud be correct', function () {
                assert.equal(-1,-1);
            });
        });
    describe('Initializer',function() {
        it('Should not be null after init',function() {
            var test = new MongoReporter();
            assert.notEqual(test,undefined);
        });
    });
    describe('Options',function() {
        it('Should have options',function() { 
           var test = new MongoReporter({test:"test"});
                assert.notEqual(test.options.test,undefined);
           });
        it('Should have ip',function() { 
           var test = new MongoReporter({ip:"test"});
                assert.notEqual(test.options.ip,undefined);
           });
    });
}());