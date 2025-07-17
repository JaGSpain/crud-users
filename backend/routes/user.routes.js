import express from "express";
import userController from '../controllers/user.controller.js';

//creamos enrutador
const router=express.Router();

//Creamos rutas de enlace
router.get('/users',userController.getAllUsers);

router.get('/users/save-remote',userController.downloadUsersToLocal);

router.get('/users/local/',userController.getAllUsers_local);

router.post('/users/local',userController.createUser_local);

// router.put('/users/local/:id',userController.updateUserById_local);

router.patch('/users/local/:id',userController.patchUserById_local);

router.delete('/users/local/:id',userController.deleteUserById_local);

export default router;

