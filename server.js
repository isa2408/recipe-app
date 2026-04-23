const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-app')
  .then(() => console.log('MongoDB қосылды'))
  .catch(err => console.error('MongoDB қатесі:', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'recipe-secret',
  resave: false,
  saveUninitialized: false
}));

const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/', recipeRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT} мекенжайында іске қосылды`);
});
// server configured
