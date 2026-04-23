const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/categories', async (req, res) => {
  try {
    const categories = await Recipe.distinct('category');
    res.render('categories', { categories, user: req.session.user });
  } catch (err) { res.status(500).send('Қате'); }
});

module.exports = router;
