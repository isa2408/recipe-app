const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.render('index', { recipes, user: req.session.user });
  } catch (err) { res.status(500).send('Сервер қатесі'); }
});

router.get('/add', (req, res) => {
  res.render('add', { user: req.session.user });
});

router.post('/add', async (req, res) => {
  try {
    const { title, category, ingredients, instructions, cookingTime } = req.body;
    const recipe = new Recipe({
      title, category,
      ingredients: ingredients.split(',').map(i => i.trim()),
      instructions, cookingTime
    });
    await recipe.save();
    res.redirect('/');
  } catch (err) { res.status(500).send('Рецепт сақталмады'); }
});

router.delete('/recipe/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: 'Жою қатесі' }); }
});

module.exports = router;
// routes defined
