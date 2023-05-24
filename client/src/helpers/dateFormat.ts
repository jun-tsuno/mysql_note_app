import { format } from 'date-fns';

export const dateFormat = (date: string) => {
	const result = format(new Date(date), 'LLL d, yyyy');
	return result;
};
