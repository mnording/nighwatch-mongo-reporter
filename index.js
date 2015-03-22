/*jslint node: true */
'use strict';
var MongoClient = require('mongodb').MongoClient;
module.exports = function (options) {
    this.options = options;
    var self = this;
    this.fn = function (results, done) {
        MongoClient.connect('mongodb://'  + self.options.ip + '/' + self.options.dbname, function (err, db) {
            if (err) {
                throw err;
            }
            var collection = db.collection(self.options.collection);
            collection.insert(results, function (err, docs) {
                db.close();
                done();
            });
        });
    };
};