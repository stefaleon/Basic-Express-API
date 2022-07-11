import express from 'express';
const router = express.Router();
import {
  createUser,
  loginUser,
  readUsers,
  readUser,
  updateUser,
  deleteUser,
  changeOwnPassword,
} from '../controllers/users.js';
import adminonly from '../middleware/adminonly.js';
import authorize from '../middleware/authorize.js';

router.post('/', createUser); // Create an initial admin, then comment out and use the next line
// router.post('/', adminonly, createUser);
router.post('/login', loginUser);
router.get('/', adminonly, readUsers);
router.get('/:id', adminonly, readUser);
router.patch('/:id', adminonly, updateUser);
router.delete('/:id', adminonly, deleteUser);
router.patch('/changeownpassword/:id', authorize, changeOwnPassword);

export default router;
