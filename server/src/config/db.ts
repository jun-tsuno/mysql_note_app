import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: Number(process.env.DB_PORT),
	multipleStatements: true,
	// ssl: {
	// 	rejectUnauthorized: true,
	// },
});

export const connectDb = () => {
	try {
		db.getConnection((err, connection) => {
			if (err) return console.log(err);
			console.log('DB connected');

			const sqlCreateUserTable = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      )`;

			const sqlCreateNoteTable = `CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        user_id INT NOT NULL,
        flagged BOOL,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`;

			const sqlCreateFlaggedTable = `CREATE TABLE IF NOT EXISTS flagged (
        id INT AUTO_INCREMENT NOT NULL,
        user_id INT NOT NULL,
        note_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (note_id) REFERENCES notes(id)
      )`;

			const query = `${sqlCreateUserTable}; ${sqlCreateNoteTable}; ${sqlCreateFlaggedTable}`;

			db.query(query, (err, result) => {
				if (err) return console.log(err);
				console.log('Table created');
			});
			connection.release();
		});
	} catch (error) {
		console.log(error);
	}
};
