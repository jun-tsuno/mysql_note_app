import express from 'express';
import { userLogin, deleteUser } from '../controllers/authControllers';

const router = express.Router();

router.post('/', userLogin);
router.delete('/:userId', deleteUser);

export default router;
