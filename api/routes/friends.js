const { Router } = require('express');
const router = Router();
const friendsController = require('../controllers/friends/friendsController');

router.get('/:userId', friendsController.getFriends);

module.exports = router;
