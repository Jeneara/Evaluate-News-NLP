var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
const fetch = require("node-fetch");


//Call API KEY
dotenv.config();
const api_key = process.env.API_KEY;

// Start up an instance of app
const app = express()

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)
console.log(`Your API key is ${process.env.API_KEY}`);


// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Test API
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

//Get API Data
app.post('/userText', async (req, res) => {
    console.log('req.body ===+>', req.body)
    //Fetch
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${api_key}&url=${req.body.formText}&lang=en`)
        .then(response => ({
            status: response.status,
            body: response.json()
        }))
        .then(({
            status,
            body
        }) => console.log(status, body))
        .catch(error => console.log('error', error));
});