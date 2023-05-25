import { useState, useCallback } from 'react';
import { User } from '@/types/userTypes';

const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);

	const userSignIn = useCallback((user: User) => {
		setUser(user);
	}, []);

	const userSignOut = () => {
		setUser(null);
	};

	return { user, userSignIn, userSignOut };
};

export default useAuth;
