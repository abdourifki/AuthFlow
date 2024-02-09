const {Router} = require('express');
const PermissionController= require('../controllers/PermissionController');
const authMiddleware = require('../midlleware/authMiddleware');

const permissionRouter= Router();

permissionRouter.post('/', PermissionController.addPermission);
permissionRouter.patch('/', PermissionController.assignPermissionToRole);
permissionRouter.put('/:id', PermissionController.updatePermission);
permissionRouter.delete('/:id', PermissionController.deletePermission);
permissionRouter.get('/', PermissionController.getAllPermissions);



module.exports = permissionRouter;