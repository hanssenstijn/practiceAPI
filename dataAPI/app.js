// load the package
const express = require('express');
// store express functionallity in app
const app = express();
// assign to a port
const port = 3000;
// return a specific element (text in this case)
app.get('/', (req, res) => res.send('Hello World!'));
// post response 
app.post('/', function(req, res) { res.send('Got a POST request') });
// Check for response by listening
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
// serving static files from a certain directory (which can aslo be multiple)
app.use(express.static('directoryName'));
app.use(express.static('files'));
// handle 404 response
app.use(function(req, res, next) { res.status(404).send("Sorry can't find that!") });
// error handler
app.use(function(err, req, res, next) { console.error(err.stack) res.status(500).send('Something broke!') });