const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');
const passValidate = require('../middleware/passValidate');

const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 5, // 
  message: " Trop de tentatives échouées, réessayez dans 5 minutes",
});


router.post('/signup', passValidate, userCtrl.signup);
router.post('/login',rateLimiter, userCtrl.login);

module.exports = router;