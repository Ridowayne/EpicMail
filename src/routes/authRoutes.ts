import express from 'express';
import controller from './../contollers/authcontroller';
const router = express();

router.post('/signup', controller.register);
router.post('/login', controller.login);
router.post('/allUsers', controller.getAllUsers);

export = router;
