import { api } from '../api';

export const userLoginAPI = async (id: string, email: string) => {
	try {
		const { data } = await api.post('/api/auth', { id, email });
		return data;
	} catch (error) {
		console.log(error);
	}
};
