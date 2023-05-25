import { api } from '../api';

export const getNotesAPI = async () => {
	try {
		const { data } = await api.get('/api/notes');
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getNoteByIdAPI = async (id: string) => {
	try {
		const { data } = await api.put(`/api/notes/${id}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteNoteAPI = async (id: string) => {
	try {
		const { data } = await api.delete(`/api/notes/${id}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const createNoteAPI = async (title: string, description: string) => {
	try {
		const { data } = await api.post('/api/notes/', { title, description });
		return data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
};

export const editNoteAPI = async (
	id: string,
	title: string,
	description: string
) => {
	try {
		const result = await api.put(`/api/notes/update/${id}`, {
			title,
			description,
		});

		return result;
	} catch (error) {
		console.log(error);
	}
};
