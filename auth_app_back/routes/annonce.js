const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Annonce = require('../models/Annonce');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Récupérer toutes les annonces (avec filtrage optionnel)
router.get('/', [
  query('category').optional().isIn(['Immobilier', 'Véhicules', 'Électronique', 'Maison & Jardin', 'Mode', 'Loisirs', 'Emploi', 'Services', 'Autre'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Paramètres invalides', 
        errors: errors.array() 
      });
    }

    let filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const annonces = await Annonce.find(filter)
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Annonces récupérées avec succès',
      annonces
    });

  } catch (error) {
    console.error('Erreur récupération annonces:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Récupérer une annonce par ID
router.get('/:id', async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id)
      .populate('author', 'username email');

    if (!annonce) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    res.json({
      message: 'Annonce récupérée avec succès',
      annonce
    });

  } catch (error) {
    console.error('Erreur récupération annonce:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Créer une annonce (route protégée)
router.post('/', authMiddleware, [
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Le titre doit contenir entre 5 et 100 caractères'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('La description doit contenir entre 10 et 1000 caractères'),
  body('price').isNumeric({ min: 0 }).withMessage('Le prix doit être un nombre positif'),
  body('category').isIn(['Immobilier', 'Véhicules', 'Électronique', 'Maison & Jardin', 'Mode', 'Loisirs', 'Emploi', 'Services', 'Autre']).withMessage('Catégorie invalide'),
  body('location').optional().trim().isLength({ max: 100 }).withMessage('La localisation ne peut pas dépasser 100 caractères')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Données invalides', 
        errors: errors.array() 
      });
    }

    const { title, description, price, category, location } = req.body;

    // L'ID de l'auteur est automatiquement récupéré du token JWT
    const annonce = new Annonce({
      title,
      description,
      price: parseFloat(price),
      category,
      location,
      author: req.user._id // ID récupéré automatiquement du middleware auth
    });

    await annonce.save();

    // Peupler les informations de l'auteur pour la réponse
    await annonce.populate('author', 'username email');

    res.status(201).json({
      message: 'Annonce créée avec succès',
      annonce
    });

  } catch (error) {
    console.error('Erreur création annonce:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Modifier une annonce (route protégée)
router.put('/:id', authMiddleware, [
  body('title').optional().trim().isLength({ min: 5, max: 100 }).withMessage('Le titre doit contenir entre 5 et 100 caractères'),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }).withMessage('La description doit contenir entre 10 et 1000 caractères'),
  body('price').optional().isNumeric({ min: 0 }).withMessage('Le prix doit être un nombre positif'),
  body('category').optional().isIn(['Immobilier', 'Véhicules', 'Électronique', 'Maison & Jardin', 'Mode', 'Loisirs', 'Emploi', 'Services', 'Autre']).withMessage('Catégorie invalide'),
  body('location').optional().trim().isLength({ max: 100 }).withMessage('La localisation ne peut pas dépasser 100 caractères')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Données invalides', 
        errors: errors.array() 
      });
    }

    const annonce = await Annonce.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    ).populate('author', 'username email');

    if (!annonce) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    res.json({
      message: 'Annonce modifiée avec succès',
      annonce
    });

  } catch (error) {
    console.error('Erreur modification annonce:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Supprimer une annonce (route protégée)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const annonce = await Annonce.findByIdAndDelete(req.params.id);

    if (!annonce) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    res.json({ message: 'Annonce supprimée avec succès' });

  } catch (error) {
    console.error('Erreur suppression annonce:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;