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

	const getFlaggedList = () => {
		if (!noteList) return null;

		return noteList?.filter((note) => {
			return note.flagged_id !== null;
		});
	};

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
		await flagNoteAPI(userId, noteId, isFlagged).then((res) => {
			const newNoteList = (res: string | null): Note[] | null => {
				if (!noteList) return null;
				return noteList?.map((note) => {
					if (note.note_id === +noteId) {
						note.flagged_id = res;
					}
					return note;
				});
			};

			setNote({ ...note, flagged_id: res } as Note);
			setNoteList(newNoteList(res));
		});
	};

	return {
		noteList,
		note,
		getNoteList,
		getNote,
		getFlaggedList,
		deleteNote,
		createNote,
		editNote,
		flagNote,
	};
};

export default useNote;
