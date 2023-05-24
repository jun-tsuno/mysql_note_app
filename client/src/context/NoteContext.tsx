'use client';
import { ReactNode, createContext, useContext } from 'react';
import useNote from '@/hooks/useNote';

type NoteContextType = {
	noteCtx: ReturnType<typeof useNote>;
};

export const NoteContext = createContext<NoteContextType>(
	{} as NoteContextType
);

export const NoteContextProvider = ({ children }: any) => {
	const value = { noteCtx: useNote() };

	return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export const useNoteContext = () => {
	return useContext(NoteContext);
};
