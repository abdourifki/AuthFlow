const {Router} = require('express');
const {signup, login, checkLogin} = require('../controllers/AuthController');
const router = Router();


router.post('/signup',signup);
router.post('/login',login);
router.get('/checkLogin',checkLogin);


module.exports = router;