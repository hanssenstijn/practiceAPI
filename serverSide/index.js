// npm init to get the json package file
// npm install express, gets immediately stored in the package json file
// npm install nodeman --> package which will show changes in code automatically
// run file with nodeman --> eg nodeman ./index.js
// npm install nedb --save to set up the database
// require the package
const express = require('express');
// Set up data base, require the package
const Datastore = require('nedb');
// call the express function
const app = express();
// listen to call, set the port first, call back comment
app.listen(3000, () => console.log('listening at 3000'));
// server public accesable
app.use(express.static('public'));
// set what we want to recieve, in this case what kind of data.
app.use(express.json({
    limit: '1mb'
}));
// set data array
const database = new Datastore('database.db');
// load the exisiting data from the previous file
database.loadDatabase();

// GET moethod route
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err){
            response.end();
            return;
        }
        response.json(data);
    });
    // call the repsonse with get in all.html

});

// add data to the database
// everytime gets a new id
// database.insert({name: 'Sheefmahn', status: ":)"});
// database.insert({name: 'Daniel', status: ":D"});
// POST method route bounded to the fetch of index
app.post('/api', (request, response) => {
    // console.log('I got request!');
    // console.log(request.body);
    const data = request.body;
    // add the date and time to the stamp
    const timestamp = Date.now();
    data.timestamp = timestamp;
    // store the data into the database
    database.insert(data);
    response.json(data);
})
