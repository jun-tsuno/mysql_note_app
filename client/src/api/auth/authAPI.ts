import { api } from '../api';

export const userLoginAPI = async (id: string, email: string) => {
	try {
		const { data } = await api.post('/api/auth', { id, email });
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const userDeleteAPI = async (userId: string) => {
	try {
		const { data } = await api.delete(`/api/auth/${userId}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};
