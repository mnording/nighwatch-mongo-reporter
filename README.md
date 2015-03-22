# nighwatch-mongo-reporter
A custom reporter for the nighwatch project. Storing all results in a mongoDB
The reporter expects an options object
```javascript
{
dbname : "test",
ip: "127.0.0.1",
collection: "testcollection"
}
```

#How to use it with nighwatch
You use the reporter as a custom reporter
You define the reporter inside of the globals.js file of nightwatch
```javascript
var mongoreport = require('nightwatch-mongo-reporter');
var mongo = new mongoreport({
    ip:"127.0.0.1:27017",
    dbname:"testdb",
    collection:"testcollection"
});


module.exports = {
    reporter:mongo.fn
};
```