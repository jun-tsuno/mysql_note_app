import { z } from 'zod';

const zEnv = z.object({
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),

	NEXTAUTH_URL: z.string(),
	NEXTAUTH_SECRET: z.string(),
});

export const env = zEnv.parse(process.env);
