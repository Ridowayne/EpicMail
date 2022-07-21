import express from 'express';
import protectedRoute from '../middlewares/extractJWT';
import controller from './../contollers/authcontroller';
const router = express();

router.post('/signup', controller.signUp);
router.post('/login', controller.login);
router.post('/forgotPassword', controller.forgotPassword);
router.post('/resetPassword/:resetToken', controller.resetPassword);
router.get('/allUsers', protectedRoute, controller.getAllUsers);

export = router;
