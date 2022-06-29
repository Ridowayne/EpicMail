import express from 'express';
import controller from '../contollers/MessagesController';

const router = express.Router();

router.post('/sendmail', controller.createMessage);

export = router;
