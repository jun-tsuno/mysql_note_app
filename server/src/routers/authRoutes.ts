import express from 'express';
import { userLogin } from '../controllers/authControllers';

const router = express.Router();

router.post('/', userLogin);

export default router;
