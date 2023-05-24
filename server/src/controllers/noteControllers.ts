import { Request, Response } from 'express';
import { db } from '../config/db';

export const getNotes = (req: Request, res: Response) => {
	const sqlSelectNotes = 'SELECT * FROM notes';
	db.query(sqlSelectNotes, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(400).json({ message: 'Fail to fetch data' });
		}
		return res.status(200).json(result);
	});
};

export const getNote = (req: Request, res: Response) => {
	const { id } = req.params;

	const sqlSelectNote = `SELECT * FROM notes WHERE id = ?`;
	db.query(sqlSelectNote, id, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'Fail to fetch a note' });
		}

		return res.status(200).json(result);
	});
};

export const createNote = (req: Request, res: Response) => {
	const { title, description } = req.body;

	const sqlCreateNote = `INSERT INTO notes (title, description, flagged, updatedAt) VALUES (?, ?, false, NOW())`;

	db.query(sqlCreateNote, [title, description], (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'Fail to create' });
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
	const { id } = req.params;

	const sqlDeleteNote = `DELETE FROM notes WHERE id = ?`;
	db.query(sqlDeleteNote, id, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'Fail to delete' });
		}

		return res.status(200).json({ message: 'Successfully deleted' });
	});
};

export const updateNote = (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, description, flagged } = req.body;

	const sqlUpdateNote = `UPDATE notes SET title = ?, description = ?, flagged = ? WHERE id = ?`;
	db.query(sqlUpdateNote, [title, description, flagged, id], (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'Fail to update' });
		}

		return res.status(200).json({ message: 'Successfully updated' });
	});
};
