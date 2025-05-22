const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const annonceRoutes = require('./routes/annonces');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connexion MongoDB réussie'))
.catch(err => console.log('Erreur connexion MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/annonces', annonceRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API Petites Annonces fonctionnelle!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
