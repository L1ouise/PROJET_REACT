const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Immobilier', 'Véhicules', 'Électronique', 'Maison & Jardin', 'Mode', 'Loisirs', 'Emploi', 'Services', 'Autre']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Annonce', annonceSchema);
