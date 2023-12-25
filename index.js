// index.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", (req, res) => {

  if (req.params.date) {
    return res.json({
      unix: Date.now(),
      utc: new Date().toUTCString()
    })
  }
  if (!req.params.date.includes('-')) {

    return res.json({
      unix: Number(req.params.date),
      utc: new Date(Number(req.params.date)).toUTCString()
    })

  } else {
    return res.json({
      unix: Date.parse(req.params.date),
      utc: new Date(Date(req.params.date)).toUTCString()
    })
  }

})
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
