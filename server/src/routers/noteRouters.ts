import express from 'express';
import {
	getNotes,
	getNote,
	createNote,
	deleteNote,
	updateNote,
	toggleFlagged,
} from '../controllers/noteControllers';

const router = express.Router();

router.get('/all-notes/:userId', getNotes);
router.get('/get-note/:userId/:noteId', getNote);
router.post('/create', createNote);
router.put('/update', updateNote);
router.delete('/delete/:userId/:noteId', deleteNote);
router.put('/flagged', toggleFlagged);

export default router;
