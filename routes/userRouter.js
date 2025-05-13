const express = require('express');
const router = express.Router();

const {
  fetchUsers,
  postUser,
  findUser,
  editUser,
  deleteUser
} = require('../controllers/userController');

router.route('/')
  .get(fetchUsers)
  .post(postUser);

router.route('/:id')
  .get(findUser)
  .put(editUser)
  .delete(deleteUser);

module.exports = router;
