/*jslint node: true */
'use strict';
var MongoClient = require('mongodb').MongoClient;
module.exports = function (options) {
    this.options = options;
    if (this.options === undefined) {
        this.options = {
            ip: "127.0.0.1:27017",
            dbname : "test",
            collection: "test_insert",
            customObject : null
        };
    }
    var self = this;
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