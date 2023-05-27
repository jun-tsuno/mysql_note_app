import { useState, useCallback } from 'react';
import { Note } from '@/types/noteTypes';
import {
	getNotesAPI,
	getNoteByIdAPI,
	deleteNoteAPI,
	createNoteAPI,
	editNoteAPI,
} from '@/api/note/noteAPI';
import { dateFormat } from '@/helpers/dateFormat';

const useNote = () => {
	const [noteList, setNoteList] = useState<Note[] | null>(null);
	const [note, setNote] = useState<Note | null>(null);

	const getNoteList = useCallback(async (userId: string) => {
		const allNotes = await getNotesAPI(userId);
		setNoteList(allNotes);
	}, []);

	const getNote = useCallback(async (noteId: string, userId: string) => {
		const note = await getNoteByIdAPI(noteId, userId);

		const formattedDate = dateFormat(note[0].updatedAt);
		setNote({ ...note[0], updatedAt: formattedDate });
	}, []);

	const deleteNote = async (userId: string, noteId: string) => {
		await deleteNoteAPI(userId, noteId);
	};

	const createNote = async (
		title: string,
		description: string,
		userId: string
	) => {
		const result = await createNoteAPI(title, description, userId);

		if (result.status === 500) console.log(result);
	};

	const editNote = async (
		noteId: string,
		userId: string,
		title: string,
		description: string
	) => {
		await editNoteAPI(noteId, userId, title, description);
	};

	return {
		noteList,
		note,
		getNoteList,
		getNote,
		deleteNote,
		createNote,
		editNote,
	};
};

export default useNote;
