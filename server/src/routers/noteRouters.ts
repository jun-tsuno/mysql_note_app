import express from 'express';
import {
	getNotes,
	getNote,
	createNote,
	deleteNote,
	updateNote,
} from '../controllers/noteControllers';

const router = express.Router();

router.get('/', getNotes);
router.put('/:id', getNote);
router.post('/', createNote);
router.put('/update/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
