const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    });
    res.render('search', { recipes, query: q, user: req.session.user });
  } catch (err) { res.status(500).send('Іздеу қатесі'); }
});

module.exports = router;
