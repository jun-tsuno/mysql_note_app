import { createContext, useContext } from 'react';
import useNote from '@/hooks/useNote';
import useAuth from '@/hooks/useAuth';

type MContextType = {
	noteCtx: ReturnType<typeof useNote>;
	authCtx: ReturnType<typeof useAuth>;
};

export const MContext = createContext<MContextType>({} as MContextType);

export const MContextProvider = ({ children }: any) => {
	const value = { noteCtx: useNote(), authCtx: useAuth() };

	return <MContext.Provider value={value}>{children}</MContext.Provider>;
};

export const useMContext = () => {
	return useContext(MContext);
};
