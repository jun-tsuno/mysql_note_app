import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: Number(process.env.DB_PORT),
	// ssl: {
	// 	rejectUnauthorized: true,
	// },
});

export const connectDb = () => {
	try {
		db.getConnection((err, connection) => {
			if (err) return console.log(err);
			console.log('DB connected');

			const sqlCreateTable = `CREATE TABLE IF NOT EXISTS notes (
          id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          flagged BOOL,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`;
			db.query(sqlCreateTable, (err, result) => {
				if (err) return console.log(err);
				console.log('Table created');
			});
			connection.release();
		});
	} catch (error) {
		console.log(error);
	}
};
