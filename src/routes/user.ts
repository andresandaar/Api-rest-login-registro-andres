import {Router} from 'express';
import {UserController} from '../controller/UserController';
const router =Router();
//get all users
router.get('/',UserController.getAll);
//get one user
router.get('/:id',UserController.getById);
// Create a new user
router.post('/',UserController.newUser);
// Edit user
router.patch('/:id',UserController.editUser);
// Delete user
router.delete('/:id',UserController.delateUser);

export default router;