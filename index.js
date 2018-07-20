const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware

// Create an instance of Pusher
const pusher = new Pusher({
	appId: '563843',
	key: '3572ca9e7c905176f153',
	secret: '2906e4d292ae3697766b',
	cluster: 'mt1',
	encrypted: true
});

pusher.trigger('lycan', 'StartUp', {
  "message": "hello world"
});

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/'));

// get authentictation for the channel;
app.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  var presenceData = {
    user_id:
      Math.random()
        .toString(36)
        .slice(2) + Date.now()
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

//listen on the app
app.listen(3000, () => {
    return console.log('Server is up on 3000')
});