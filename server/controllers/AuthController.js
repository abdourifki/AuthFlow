
const User = require('../models/UserSchema');
const Role = require('../models/RoleSchema');
const Permission =require('../models/PermissionSchema');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const env = require('dotenv');



// Fonction d'inscription
const signup = async (req, res) => {
  // Extraire les données de la requête (nom d'utilisateur, mot de passe, email)
  const { username, password, email,role,permission } = req.body;

  console.log(username);
  try {
    // Vérifier si les champs obligatoires sont présents dans la requête
    if (!username || !password || !email) {
      return res.status(400).json({ err: 'Invalid username or password or email' });
    }
    const existingUser = await User.findOne({ email: email });
    if(existingUser) {
      return res.status(200).json({message: 'User already exists'})
    }
    const userRole = await Role.findOne({ name: "visitor" });
    if(!userRole) {
      return res.status(400).json({message: 'default role not found'})
    }

    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: userRole._id,
   });
   await newUser.save();  
   res.status(201).json( {user:newUser.username,role:newUser.role.name});
   console.log(newUser.email, newUser.role)
    
  } catch (err) {
    console.log('error creating user', err);
    // En cas d'erreur, retourner une réponse d'erreur interne du serveur
    return res.status(500).json({
      message:'internal server error'
    });
  }
};

// Fonction de connexion
const login = async (req, res) => {
  // Extraire les données de la requête (nom d'utilisateur, mot de passe)
  const { username, password, } = req.body;

  // Rechercher l'utilisateur dans la base de donn,rées
  const user = await User.findOne({ username }).populate('role')

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
      { sub: user._id, username: user.username, email: user.email, role: user.role, },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    

    // Retourner une réponse avec le token et les informations de l'utilisateur
    return res.status(201).json({
      token,
      user: { username: user.username, email: user.email},
      role:user.role.name,
      
    });
  } catch (err) {
    // En cas d'erreur, retourner une réponse d'erreur
    return res.status(501).json({ message: 'Error logging in' });
  }
};

const checkLogin = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  if(!decodedToken) {
    return res.status(401).json({ loggedIn: false });
  }

  const user = User.findById(decodedToken.sub).populate("Role")
  console.log(user);
  if(!user){
    return res.status(401).json({ loggedIn: false });
  }

  return res.status(200).json({loggedIn: true, user : decodedToken});
};

module.exports = {
  login,
  signup,
  checkLogin
};
