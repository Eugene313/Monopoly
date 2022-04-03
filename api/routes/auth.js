const { Router } = require('express');
const router = Router();

router.get('/auth/login', (req, res) => {
  res.send('Login');
});

module.exports = router;
