import express from 'express'

import auth from '../middleware/middleware.js'
import { deleteUserById, getAllUsers, getUserprofile, login, register,imageUpload, addProduct } from '../controllers/user.controller.js';
import { upload } from '../middleware/fileupload.js';

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/profile",auth,getUserprofile)
router.get('',getAllUsers);
router.delete("/:id",auth,deleteUserById)
router.post('/imageUpload',auth,upload.single('image'),imageUpload);
router.post('/addproduct',upload.single('image'),addProduct);
export default router;