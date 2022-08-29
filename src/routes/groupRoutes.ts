import express from 'express';
import GroupController from '../contollers/GroupController';
import protectedRoute from '../middlewares/extractJWT';
const router = express.Router();

router.use(protectedRoute);

router.post('/createGroup', GroupController.newGroup);
router.patch('/addMembers/:id', GroupController.addMembers);
router.post('/sendMessage/:id', GroupController.sendGroupMessage);
router.get('/readMessages/:id', GroupController.getGroupMessage);

export = router;
