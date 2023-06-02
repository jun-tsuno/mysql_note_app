import { Request, Response } from 'express';
import { db } from '../config/db';

export const userLogin = async (req: Request, res: Response) => {
	const { id, email } = req.body;

	const sqlFindUser = `SELECT * FROM users WHERE email = ?`;
	const sqlInsertUserData = `INSERT INTO users (user_id, email) VALUES (?, ?)`;

	db.query(sqlFindUser, email, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'Fail to search the user' });
		}

		if (result.length > 0) {
			return res.status(200).json({ message: 'User signIn' });
		}

		// if user is not exist, insert data
		db.query(sqlInsertUserData, [id, email], (err, result) => {
			if (err) {
				console.log(err);
				return res
					.status(500)
					.json({ message: 'Fail to insert user data', err });
			}

			return res.status(201).json({ message: 'User signUp', result });
		});
	});
};

export const deleteUser = (req: Request, res: Response) => {
	const { userId } = req.params;

	const sqlDeleteUser = `DELETE FROM users WHERE user_id = ?`;
	const sqlDeleteNotes = `DELETE FROM notes WHERE user_id = ?`;
	const sqlDeleteFlagged = `DELETE FROM flagged WHERE user_id = ?`;

	const sqlDeleteUserRecord = `${sqlDeleteFlagged}; ${sqlDeleteNotes}; ${sqlDeleteUser}`;
	db.query(sqlDeleteUserRecord, [userId, userId, userId], (err, result) => {
		if (err) {
			console.log(err);
			return res
				.status(500)
				.json({ message: 'Fail to delete user data', err, deleted: false });
		}

		return res.status(200).json({ message: 'User Deleted', deleted: true });
	});
};
