
const  mongoose  = require('mongoose');

const Permission = require('../models/PermissionSchema');

const Role = require('../models/RoleSchema');

// Contrôleur pour la gestion des permissions
const PermissionController = {
  // Fonction pour ajouter une nouvelle permission
  addPermission: async (req, res) => {
    // Extraire les données de la requête (nom de la permission, ID du rôle associé)
    const { name, roleId } = req.body;

    try {
      // Créer une nouvelle permission dans la base de données
      const newPermission = await Permission.create({ name });

      // Si un ID de rôle est fourni, associer la nouvelle permission au rôle correspondant
      if (roleId) {
        console.log(roleId);
        // Mettre à jour le rôle en ajoutant l'ID de la nouvelle permission à la liste des permissions
        const updatedRole = await Role.findOneAndUpdate(
          { _id: roleId },
          {
            $push: {
              permissions: newPermission._id,
            },
          }
        );
      }

      // Retourner une réponse avec un statut 201 en cas de succès
      res.status(201).json({ message: 'Permission created successfully' });
    } catch (err) {
      // En cas d'erreur, retourner une réponse d'erreur avec un statut 501
      res.status(501).json({ message: 'Error creating permission' });
    }
  },
  updatePermission: async (req,res)=>{
    const {id}= req.params
    try{
      if(!id){
        res.send(404).json({message:"id not found cant update"})
      }
      await Permission.findByIdAndUpdate(id,req.body)
      res.status(200).json({Permission, message: 'Permission updated successfully'});

    }catch(err){
      res.send(500).json({message:"Error updating permission"});
    }

  },

  deletePermission: async(req,res)=>{
    try{
      await Permission.findByIdAndDelete(req.params.id)
        res.status(200).json({Permission,message:"permission deleted succesfully"})
    }catch (err){
        console.error({message:"erreur deleting data"},err)
    }
},
 

  assignPermissionToRole : async (req,res)=>{
    try {
      const {roleId,permissionId} = req.body;

      // Si un ID de rôle est fourni, associer la nouvelle permission au rôle correspondant
      if (roleId || permissionId) {
        console.log(roleId);
        // Mettre à jour le rôle en ajoutant l'ID de la nouvelle permission à la liste des permissions
        const updatedRole = await Role.findOneAndUpdate(
          { _id: roleId },
          {
            $push: {
              permissions: permissionId,
            },
          }
        );
      }

      // Retourner une réponse avec un statut 201 en cas de succès
      res.status(201).json({ message: 'Permission assigned successfully' });
    } catch (err) {
      // En cas d'erreur, retourner une réponse d'erreur avec un statut 501
      res.status(501).json({ message: 'Error assigned permission' });
    }

  },
  getAllPermissions: async(req,res)=>{
    try{
      const permissions = await Permission.find();
      res.status(200).json({permissions});
    }catch(err){
      res.send(500).json({message:"Error getting permission"});
    }

  }
};



module.exports = PermissionController;
