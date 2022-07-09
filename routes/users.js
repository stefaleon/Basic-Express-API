const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const adminonly = require('../middleware/adminonly');
const authorize = require('../middleware/authorize');

router.post('/', usersController.createUser); // Create an initial admin, then comment out and use the next line
// router.post('/', adminonly, usersController.createUser);
router.post('/login', usersController.loginUser);
router.get('/', adminonly, usersController.readUsers);
router.get('/:id', adminonly, usersController.readUser);
router.patch('/:id', adminonly, usersController.updateUser);
router.delete('/:id', adminonly, usersController.deleteUser);
router.patch(
  '/changeownpassword/:id',
  authorize,
  usersController.changeOwnPassword
);

module.exports = router;
