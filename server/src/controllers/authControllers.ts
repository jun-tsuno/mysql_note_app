import { Request, Response } from 'express';
import { db } from '../config/db';

export const userLogin = async (req: Request, res: Response) => {
	const { name, email } = req.body;

	const sqlFindUser = `SELECT * FROM users WHERE email = ?`;
	const sqlInsertUserData = `INSERT INTO users (name, email) VALUES (?, ?)`;

	db.query(sqlFindUser, email, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: 'Fail to fetch user' });
		}

		if (result.length > 0) {
			return res.status(400).json({ message: 'User signIn', result });
		}

		// if user is not exist, insert data
		db.query(sqlInsertUserData, [name, email], (err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: 'Fail to fetch user' });
			}

			return res.status(201).json({ message: 'User signUp', result });
		});
	});
};
