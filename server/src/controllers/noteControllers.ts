import { Request, Response } from 'express';
import { db } from '../config/db';

export const getNotes = (req: Request, res: Response) => {
	const { userId } = req.params;

	const sqlSelectNotes = 'SELECT * FROM notes WHERE user_id = ?';
	db.query(sqlSelectNotes, userId, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(400).json({ message: 'Fail to fetch notes' });
		}
		return res.status(200).json(result);
	});
};

export const getNote = (req: Request, res: Response) => {
	const { noteId, userId } = req.params;

	const sqlSelectNote = `SELECT * FROM notes WHERE id = ? AND user_id = ?`;
	db.query(sqlSelectNote, [noteId, userId], (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'Fail to fetch a note' });
		}

		return res.status(200).json(result);
	});
};

export const createNote = (req: Request, res: Response) => {
	const { title, description, userId } = req.body;

	const sqlCreateNote = `INSERT INTO notes (title, description, user_id, flagged, updatedAt) VALUES (?, ?, ?, false, NOW())`;

	db.query(sqlCreateNote, [title, description, userId], (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'Fail to create a note' });
		}
		const newPostId = result.insertId;

		const sqlNewNote = `SELECT * FROM notes WHERE id = ?`;
		db.query(sqlNewNote, newPostId, (err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: 'Fail to fetch a new note' });
			}

			return res.status(201).json({ message: 'Successfully created', result });
		});
	});
};

export const deleteNote = (req: Request, res: Response) => {
	const { userId, noteId } = req.params;
	console.log(req.body.data);

	const sqlDeleteNote = `DELETE FROM notes WHERE id = ? AND user_id = ?`;
	db.query(sqlDeleteNote, [noteId, userId], (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'Fail to delete' });
		}

		return res.status(200).json({ message: 'Successfully deleted' });
	});
};

export const updateNote = (req: Request, res: Response) => {
	const { title, description, userId, noteId } = req.body;

	const sqlUpdateNote = `UPDATE notes SET title = ?, description = ? WHERE id = ? AND user_id = ?`;
	db.query(
		sqlUpdateNote,
		[title, description, noteId, userId],
		(err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: 'Fail to update' });
			}

			return res.status(200).json({ message: 'Successfully updated' });
		}
	);
};
