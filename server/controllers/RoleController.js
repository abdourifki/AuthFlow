
const Role = require('../models/RoleSchema');
const User = require('../models/UserSchema');

// Contrôleur pour la gestion des rôles
const roleController = {
  // Fonction pour mettre à jour un rôle existant
  updateRole: async (req, res) => {
    // Extraire l'ID du rôle de la requête
    const { id } = req.params;
    // Extraire le nouveau nom du rôle de la requête
    const { name } = req.body;

    try {
      // Mettre à jour le rôle dans la base de données en utilisant l'ID
      const updatedRole = await Role.findByIdAndUpdate(id, { name });

      // Vérifier si le rôle a été trouvé et mis à jour avec succès
      if (!updatedRole) {
        res.status(400).json({ message: 'Can not find role' });
      }

      // Retourner une réponse avec un statut 200 en cas de succès
      res.status(200).json({ message: 'Role updated successfully' });
    } catch (error) {
      // En cas d'erreur, retourner une réponse d'erreur avec un statut 400
      res.status(400).json({ message: 'Failed to update role' });
    }
  },

  // Fonction pour ajouter un nouveau rôle
  addRole: async (req, res) => {
    // Extraire le nom du nouveau rôle de la requête
    const { name } = req.body;

    try {
      // Créer un nouveau rôle dans la base de données
      await Role.create({ name });

      // Retourner une réponse avec un statut 200 en cas de succès
      res.status(200).json({ message: 'Role created successfully' });
    } catch (err) {
      // En cas d'erreur, retourner une réponse d'erreur avec un statut 501
      res.status(501).json({ message: 'Error creating role' });
    }
  },

  // Fonction pour récupérer tous les rôles
  getRoles: async (req, res) => {
    try {
      // Récupérer tous les rôles de la base de données
      const roles = await Role.find();

      // Retourner une réponse avec un statut 200 et les données des rôles
      res.status(200).json({ data: roles });
    } catch (err) {
      // En cas d'erreur, retourner une réponse d'erreur avec un statut 501
      res.status(501).json({ message: 'Error getting role' });
    }
  },

  deleteRole: async(req,res)=>{
    try{
      await Role.findByIdAndDelete(req.params.id)
        res.status(200).json({Role,message:"Role deleted succesfully"})
    }catch (err){
        console.error({message:"erreur deleting Role"},err)
    }
},

  // Fonction pour attribuer un rôle à un utilisateur
  assignRoleUser: async (req, res) => {
    // Extraire l'ID de l'utilisateur et l'ID du rôle de la requête
    const { userId, roleId } = req.body;

    try {
      // Rechercher l'utilisateur dans la base de données
      const user = await User.findById(userId);
      // Vérifier si l'utilisateur existe
      if (!user) res.status(404).json({ message: 'User Not Found' });

      // Rechercher le rôle dans la base de données
      const role = await Role.findById(roleId);
      // Vérifier si le rôle existe
      if (!role) res.status(404).json({ message: 'Role Not Found' });

      // Attribuer le rôle à l'utilisateur
      user.role = role._id;
      // Enregistrer les modifications de l'utilisateur dans la base de données
      await user.save();

      // Retourner une réponse avec un statut 200 en cas de succès
      res.status(200).json({ message: 'Role assigned to the user successfully' });
    } catch (err) {
      console.log(err);
      // En cas d'erreur, retourner une réponse d'erreur avec un statut 501
      res.status(501).json({ message: 'Error Role Assigned' });
    }
  },
};


module.exports = roleController;
