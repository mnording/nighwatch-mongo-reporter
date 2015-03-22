/*jslint node: true */
'use strict';
var MongoClient = require('mongodb').MongoClient;
module.exports = {
    MongoReporter : function (options) {
        this.options = options;
        this.fn = function (results, done) {
            MongoClient.connect('mongodb://'  + this.options.ip + '/' + this.options.dbname, function (err, db) {
                if (err) {
                    throw err;
                }
                var collection = db.collection(this.options.collection);
                collection.insert(results, function (err, docs) {
                    db.close();
                    done();
                });
            });
        };
    }
};