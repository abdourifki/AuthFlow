
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

const Role = require("../models/RoleSchema");

dotenv.config();

// Construire la correspondance entre les méthodes HTTP et les actions associées
const httpMethodsActions = {
  GET: "READ",
  POST: "CREATE",
  PUT: "UPDATE",
  PATCH: "UPDATE",
  DELETE: "DELETE",
};

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  // Extraire l'en-tête d'autorisation de la requête
  const auth = req.headers.authorization;
  // Extraire le nom de la route racine à partir de l'URL
  const rootName = req.baseUrl.split("/")[1];
  // Extraire la méthode HTTP de la requête
  const reqMethod = req.method;
  // Obtenir l'action correspondante à la méthode HTTP ou "Unknown" si non défini
  const result = httpMethodsActions[reqMethod] || "Unknown";
  // Construire la permission en combinant le nom de la route et l'action de la méthode HTTP
  const rolePermission = `${result}_${rootName}`.toUpperCase();

  // Si aucun en-tête d'autorisation n'est trouvé, renvoyer une réponse d'erreur 401
  if (!auth) {
    return res.status(401).json({ message: "dont find token" });
  }

  // Diviser le token JWT de l'en-tête d'autorisation
  const token = auth.split(" ")[1];
  
  // Vérifier le token en utilisant la clé secrète stockée dans la variable d'environnement process.env.JWT_SECRET
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      console.log(rolePermission);
      
      // Rechercher le rôle de l'utilisateur dans la  base de données et peupler la propriété "permissions"
     const userRole = await Role.findById(decodedToken?.role).populate(
        "permissions"
      );
      console.log(userRole)
      
      // Vérifier si l'utilisateur a la permission nécessaire
      const hasPermission = userRole?.permissions.some(
        (perm) => perm.name === rolePermission
      );
      console.log(hasPermission)
      
      // Si l'utilisateur n'a pas la permission, renvoyer une réponse d'erreur 401
      if(!hasPermission) return res.status(401).json({ message: "unauthorized " });
      
      // Si une erreur survient lors de la vérification du token, renvoyer une réponse d'erreur 401
      if (err) {
        return res.status(403).json({ message: "invalid token" });
      } else {
        // Si tout est valide, passer au middleware suivant ou à la route suivante
        next();
      }
    });
  } else {
    // Si aucun token n'est trouvé, renvoyer une réponse d'erreur 401
    return res.status(404).json({ message: "dont find token" });
  }
};

module.exports = authMiddleware;
