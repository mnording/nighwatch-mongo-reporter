/*global require, it, describe */
(function () {
    'use strict';
    var assert = require('assert'),
        MongoReporter = require("../index.js"),
        MongoClient = require('mongodb').MongoClient;
    describe('test', function () {
        it('shoud be correct', function () {
            assert.equal(-1, -1);
        });
    });
    describe('Initializer', function () {
        it('Should not be null after init', function () {
            var test = new MongoReporter();
            assert.notEqual(test, undefined);
        });
    });
    describe('Options', function () {
        it('Should have options', function () {
            var test = new MongoReporter({test: "test"});
            assert.notEqual(test.options.test, undefined);
        });
        it('Should have ip', function () {
            var test = new MongoReporter({ip: "test"});
            assert.notEqual(test.options.ip, undefined);
        });
        it('Should load even with empty options', function () {
            var test = new MongoReporter();
            assert.notEqual(test.options.ip, undefined);
        });
        it('should create default options', function (done) {
            var MongoClient = require('mongodb').MongoClient,
                test = new MongoReporter();
            assert.equal(test.options.ip, "127.0.0.1:27017");
            assert.equal(test.options.dbname, "test");
            assert.equal(test.options.collection, "test_insert");
            assert.equal(test.options.customObject, null);
            done();

        });
        it('should allow partial options', function () {
            var test = new MongoReporter({ip: "222"});
            assert.equal(test.options.ip, "222");
            assert.equal(test.options.dbname, "test");
            assert.equal(test.options.collection, "test_insert");
        });
        it('should allow custom object', function (done) {
            var test = new MongoReporter({
                    ip: "127.0.0.2:27017",
                    dbname : "test2",
                    collection: "test2_insert",
                    customObject : {myobject : "yes it is", yourfile: "is belong to us"}
                });
            assert.equal(test.options.ip, "127.0.0.2:27017");
            assert.equal(test.options.dbname, "test2");
            assert.equal(test.options.collection, "test2_insert");
            assert.equal(test.options.customObject.myobject, "yes it is");
            assert.equal(test.options.customObject.yourfile, "is belong to us");
            done();
        });
    });
}());