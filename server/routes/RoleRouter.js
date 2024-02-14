const {Router}= require('express');
const roleController=require('../controllers/RoleController');
const authMiddleware = require('../midlleware/authMiddleware');

const roleRouter = Router();

roleRouter.post('/',roleController.addRole);
roleRouter.put('/:id',authMiddleware,roleController.updateRole);
roleRouter.patch('/assign',roleController.assignRoleUser);
roleRouter.get('/',roleController.getRoles);
roleRouter.delete('/:id',roleController.deleteRole);


module.exports = roleRouter;