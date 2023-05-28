import { useState, useCallback } from 'react';
import { Note } from '@/types/noteTypes';
import {
	getNotesAPI,
	getNoteByIdAPI,
	deleteNoteAPI,
	createNoteAPI,
	editNoteAPI,
	flagNoteAPI,
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

	const createNote = async (
		title: string,
		description: string,
		userId: string
	) => {
		const result = await createNoteAPI(title, description, userId);

		if (result.status === 500) console.log(result);
	};

	const deleteNote = async (userId: string, noteId: string) => {
		await deleteNoteAPI(userId, noteId);
	};

	const editNote = async (
		noteId: string,
		userId: string,
		title: string,
		description: string
	) => {
		await editNoteAPI(noteId, userId, title, description);
	};

	const flagNote = async (
		userId: string,
		noteId: string,
		isFlagged: boolean
	) => {
		const newFlaggedId = await flagNoteAPI(userId, noteId, isFlagged);
		return newFlaggedId;
	};

	return {
		noteList,
		note,
		setNote,
		getNoteList,
		getNote,
		deleteNote,
		createNote,
		editNote,
		flagNote,
	};
};

export default useNote;
