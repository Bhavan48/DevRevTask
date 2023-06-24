const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vaccination_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});
const User = mongoose.model('User', UserSchema);

const CenterSchema = new mongoose.Schema({
  name: String,
  location: String,
  workingHours: String,
});
const Center = mongoose.model('Center', CenterSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/views/signup.html');
});

app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });
  user.save();
  res.redirect('/login');
});

app.get('/search', (req, res) => {
  res.sendFile(__dirname + '/views/search.html');
});

app.get('/admin/login', (req, res) => {
  res.sendFile(__dirname + '/views/admin_login.html');
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  res.redirect('/admin/dashboard');
});

app.get('/admin/dashboard', (req, res) => {
  res.sendFile(__dirname + '/views/admin_dashboard.html');
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});