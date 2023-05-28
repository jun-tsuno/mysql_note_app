import { Request, Response } from 'express';
import { db } from '../config/db';

export const getNotes = (req: Request, res: Response) => {
	const { userId } = req.params;

	const sqlSelectNotes = `
    SELECT notes.*, flagged.flagged_id
    FROM notes LEFT JOIN flagged ON notes.note_id = flagged.note_id
    WHERE notes.user_id = ?
    `;
	db.query(sqlSelectNotes, [userId], (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'Fail to fetch notes' });
		}

		return res.status(200).json(result);
	});
};

export const getNote = (req: Request, res: Response) => {
	const { noteId, userId } = req.params;

	const sqlSelectNote = `
    SELECT notes.*, flagged.flagged_id
    FROM notes LEFT JOIN flagged ON notes.note_id = flagged.note_id
    WHERE notes.note_id = ? AND notes.user_id = ?
  `;
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

	const sqlCreateNote = `INSERT INTO notes (title, description, user_id, updatedAt) VALUES (?, ?, ?, NOW())`;
	const sqlNewNote = `SELECT * FROM notes WHERE note_id = ?`;

	db.query(sqlCreateNote, [title, description, userId], (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'Fail to create a note' });
		}

		const newPostId = result.insertId;
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

	const sqlDeleteNote = `DELETE FROM notes WHERE note_id = ? AND user_id = ?`;
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

	const sqlUpdateNote = `UPDATE notes SET title = ?, description = ? WHERE note_id = ? AND user_id = ?`;
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

export const toggleFlagged = (req: Request, res: Response) => {
	const { userId, noteId, isFlagged } = req.body;

	const sqlAddFlagged = `INSERT INTO flagged (user_id, note_id) VALUE (?, ?)`;
	const sqlRemoveFlagged = `DELETE FROM flagged WHERE note_id = ?`;

	// if isFlagged is 'true', it insert data into the flagged table
	if (isFlagged) {
		db.query(sqlAddFlagged, [userId, noteId], (err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: 'Fail to add flagged' });
			}
			const newFlaggedId = result.insertId;

			return res
				.status(200)
				.json({ message: 'Successfully added to flagged', newFlaggedId });
		});
	}

	// if isFlagged is 'false', the data is deleted from the table
	if (!isFlagged) {
		db.query(sqlRemoveFlagged, [noteId], (err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: 'Fail to remove flagged' });
			}

			return res.status(200).json({
				message: 'Successfully deleted from flagged',
				newFlaggedId: null,
			});
		});
	}
};
