const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const passValidate = require('../middleware/passValidate');

router.post('/signup', passValidate, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;