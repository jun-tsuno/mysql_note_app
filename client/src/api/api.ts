import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://mysql-note-app.vercel.app/',
});
