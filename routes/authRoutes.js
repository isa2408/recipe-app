const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/dashboard');
  } catch (err) { res.status(500).send('Тіркелу қатесі'); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Қате email немесе пароль');
    }
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/dashboard');
  } catch (err) { res.status(500).send('Кіру қатесі'); }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
