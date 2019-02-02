const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    type: String
  },

  ingredients: {
    type: []
  },

  instructions: {
    type: []
  }

});

var recipe = mongoose.model('recipe', recipeSchema);

module.exports = recipe;