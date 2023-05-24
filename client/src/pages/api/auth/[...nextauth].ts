import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env';

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
});
