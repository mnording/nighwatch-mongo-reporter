/*jslint node: true */
'use strict';
var MongoClient = require('mongodb').MongoClient;
module.exports = function (options) {
    var self = this;
    this.validateOptions = function () {
        if (self.options === undefined) {
            self.options = self.defaultOptions;
        }
        if (self.options.ip === undefined) {
            self.options.ip = self.defaultOptions.ip;
        }
        if (self.options.dbname === undefined) {
            self.options.dbname = self.defaultOptions.dbname;
        }
        if (self.options.collection === undefined) {
            self.options.collection = self.defaultOptions.collection;
        }
        if (self.options.customObject === undefined) {
            self.options.defaultOptions = self.defaultOptions.customObject;
        }
        if (self.options.customObject !== undefined) {
            if (typeof self.options.customObject !== 'object') {
                self.options.customObject = self.defaultOptions.customObject;
            }
        }
    };
    this.defaultOptions = {
        ip: "127.0.0.1:27017",
        dbname : "test",
        collection: "test_insert",
        customObject : null
    };
    this.options = options;
    if (this.options === undefined) {
        this.options = self.defaultOptions;
    }
    self.validateOptions();
    this.fn = function (results, done) {
        MongoClient.connect('mongodb://'  + self.options.ip + '/' + self.options.dbname, function (err, db) {
            if (err) {
                throw err;
            }
            var collection = db.collection(self.options.collection);
            if (self.options.customObject !== null) {
                self.options.customObject.results = results;
                results =  self.options.customObject;
            }
            collection.insert(results, function (err, docs) {
                db.close();
                done();
            });
        });
    };
};