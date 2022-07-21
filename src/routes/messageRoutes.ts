import express from 'express';
import controller from '../contollers/MessagesController';
import protectedRoute from '../middlewares/extractJWT';

const router = express.Router();

router.use(protectedRoute);

router.post('/sendmail', protectedRoute, controller.createMessage);
router.get('/getMessage/:id', protectedRoute, controller.getMessage);
router.get('/inbox', protectedRoute, controller.inboxMessage);
router.get('/sentMessages', protectedRoute, controller.sentMessages);
router.get('/drafts', protectedRoute, controller.draftMessages);
router.get('/retractedMessages', protectedRoute, controller.retractedMessages);
router.patch('/retractMessage/:id', protectedRoute, controller.retractAMessage);

export = router;
