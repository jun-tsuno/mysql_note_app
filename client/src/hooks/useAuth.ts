import { useState, useCallback } from 'react';
import { User } from '@/types/userTypes';
import { userDeleteAPI } from '@/api/auth/authAPI';

const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);

	const userSignIn = useCallback((user: User) => {
		setUser(user);
	}, []);

	const userSignOut = () => {
		setUser(null);
	};

	const userDelete = async (userId: string) => {
		const result = await userDeleteAPI(userId);
		return result.deleted;
	};

	return { user, userSignIn, userSignOut, userDelete };
};

export default useAuth;
