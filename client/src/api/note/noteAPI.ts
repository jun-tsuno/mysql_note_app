import { api } from '../api';

export const getNotesAPI = async (userId: string) => {
	try {
		const { data } = await api.get(`/api/notes/all-notes/${userId}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getNoteByIdAPI = async (noteId: string, userId: string) => {
	try {
		const { data } = await api.get(`/api/notes/get-note/${userId}/${noteId}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const createNoteAPI = async (
	title: string,
	description: string,
	userId: string
) => {
	try {
		const { data } = await api.post('/api/notes/create', {
			title,
			description,
			userId,
		});
		return data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
};

export const deleteNoteAPI = async (userId: string, noteId: string) => {
	try {
		const { data } = await api.delete(`/api/notes/delete/${userId}/${noteId}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const editNoteAPI = async (
	noteId: string,
	userId: string,
	title: string,
	description: string
) => {
	try {
		const result = await api.put('/api/notes/update/', {
			title,
			description,
			noteId,
			userId,
		});

		return result;
	} catch (error) {
		console.log(error);
	}
};

export const flagNoteAPI = async (
	userId: string,
	noteId: string,
	isFlagged: boolean
) => {
	try {
		const { data } = await api.put('/api/notes/flagged', {
			userId,
			noteId,
			isFlagged,
		});

		return data.newFlaggedId;
	} catch (error) {
		console.log(error);
	}
};
