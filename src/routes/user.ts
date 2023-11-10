import {Router} from 'express';
import {UserController} from '../controller/UserController';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';
const router =Router();

//get all users
router.get('/',[checkJwt,checkRole(['Admin']) ],UserController.getAll);
//get one user
router.get('/:id',UserController.getById);
// Create a new user
router.post('/',UserController.newUser);
// Edit user
router.patch('/:id',[checkJwt],UserController.editUser);
// Delete user
router.delete('/:id',[checkJwt],UserController.delateUser);

export default router;