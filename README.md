# nighwatch-mongo-reporter
A custom reporter for the nighwatch project. Storing all results in a mongoDB
The reporter expects an options object
```javascript
eg
{
dbname : "test",
ip: "127.0.0.1",
collection: "testcollection"
}
```