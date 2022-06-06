const { Router } = require('express');
const router = Router();
const authController = require('../controllers/auth/authController');

router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);
router.post('/signout', authController.signOut);
router.get('/user', authController.user);

module.exports = router;
