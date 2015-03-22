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
        it('Should have correct default options', function () {
            var test = new MongoReporter();
            assert.equal(test.options.ip, "127.0.0.1:27017");
            assert.equal(test.options.dbname, "test");
            assert.equal(test.options.collection, "test_insert");
        });
    });
    describe('Mongo', function () {
        it('should not crash', function () {
            var test = new MongoReporter(),
                fakecallback = function () {},
                fakeresultsobject = { test : "you shall not crash" };
            test.fn(fakeresultsobject, fakecallback);
        });
        it('should insert correct', function (done) {
            var MongoClient = require('mongodb').MongoClient,
                test = new MongoReporter(),
                fakecallback = function () {},
                time = new Date().getTime(),
                fakeresultsobject = { test : "you shall not crash" + time };
            test.fn(fakeresultsobject, fakecallback);
            MongoClient.connect('mongodb://'  + test.options.ip + '/' + test.options.dbname, function (err, db) {
                var collection = db.collection(test.options.collection)
                        .find(fakeresultsobject)
                        .limit(100)
                            .toArray(function (err, docs) {
                            assert.equal(docs.length === 1, true);
                            db.collection(test.options.collection).drop();
                            db.close();
                            done();
                        });
            });
        });
    });
}());