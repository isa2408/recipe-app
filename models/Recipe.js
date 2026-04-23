const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  category:     { type: String, required: true },
  ingredients:  [{ type: String }],
  instructions: { type: String, required: true },
  cookingTime:  { type: Number },
  author:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);
// model defined
