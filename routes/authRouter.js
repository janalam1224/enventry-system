const express = require('express');
const router = express.Router();
const { postLogin } = require('../controllers/authController');
const { route } = require('./userRouter');

router.post('/', postLogin);

module.exports = router;