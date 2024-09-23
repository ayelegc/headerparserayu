// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// /api/whoami endpoint
app.get('/api/whoami', (req, res) => {
  try {
    // Ensure proper IP address retrieval. req.ip handles proxy cases.
    const ipaddress = req.headers['x-forwarded-for'] || req.ip;

    // Retrieve preferred language from the header
    const language = req.headers['accept-language'];

    // Retrieve software (user agent) from the headers
    const software = req.headers['user-agent'];

    // Send the JSON response with the three required keys
    res.json({
      ipaddress,
      language,
      software
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
