const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController'); 

userRouter.get("/", userController.getIndex);
userRouter.get("/users", userController.fetchUsers);
userRouter.post("/user", userController.postUser);
userRouter.get("/user/:id", userController.findUser);
userRouter.put("/user/:id", userController.editUser);
userRouter.delete("/user/:id", userController.deleteUser);

module.exports = userRouter;
