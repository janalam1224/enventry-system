const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

authRouter.get("/", authController.getIndex);
authRouter.post('/login', authController.postLogin);
authRouter.get('/', authMiddleware, (req, res) => {
  res.json("welcome to Users Page");
});
module.exports = authRouter;