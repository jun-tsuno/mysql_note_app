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

	const getNote = useCallback(async (id: string) => {
		const note = await getNoteByIdAPI(id);

		const formattedDate = dateFormat(note[0].updatedAt);
		setNote({ ...note[0], updatedAt: formattedDate });
	}, []);

	const deleteNote = async (id: string) => {
		await deleteNoteAPI(id);
	};

	const createNote = async (title: string, description: string) => {
		const result = await createNoteAPI(title, description);

		if (result.status === 500) console.log(result);
	};

	const editNote = async (id: string, title: string, description: string) => {
		await editNoteAPI(id, title, description);
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
