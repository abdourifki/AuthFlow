
const User = require('../models/UserSchema');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const env = require('dotenv');



// Fonction d'inscription
const signup = async (req, res) => {
  // Extraire les données de la requête (nom d'utilisateur, mot de passe, email)
  const { username, password, email } = req.body;
  console.log(req.body);
  try {
    // Vérifier si les champs obligatoires sont présents dans la requête
    if (!username || !password || !email) {
      return res.status(400).json({ err: 'Invalid username or password or email' });
    }

    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur dans la base de données
    const user = await User.create({ username, password: hashedPassword, email });

    // Créer un token JWT avec les informations de l'utilisateur
    const token = jwt.sign(
      { sub: user._id, email: user.email, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Retourner une réponse avec le token et les informations de l'utilisateur
    return res.status(201).json({
      token,
      user: { username: user.username, email: user.email }
    });
  } catch (err) {
    console.log(err);
    // En cas d'erreur, retourner une réponse d'erreur interne du serveur
    return res.status(500).json({
      err: 'Internal server error'
    });
  }
};

// Fonction de connexion
const login = async (req, res) => {
  // Extraire les données de la requête (nom d'utilisateur, mot de passe)
  const { username, password } = req.body;

  // Rechercher l'utilisateur dans la base de données
  const user = await User.findOne({ username });

  try {
    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Vérifier si le mot de passe correspond
    const isMatch = await bcrypt.compare(password, user.password);

    // Si le mot de passe ne correspond pas, retourner une réponse d'erreur
    if (!isMatch) {
      return res.status(401).json({ message: 'Password incorrect' });
    }

    // Créer un token JWT avec les informations de l'utilisateur
    const token = jwt.sign(
      { sub: user._id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Retourner une réponse avec le token et les informations de l'utilisateur
    return res.status(201).json({
      token,
      user: { username: user.username, email: user.email }
    });
  } catch (err) {
    // En cas d'erreur, retourner une réponse d'erreur
    return res.status(501).json({ message: 'Error logging in' });
  }
};

module.exports = {
  login,
  signup,
};
