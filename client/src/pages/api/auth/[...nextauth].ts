import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env';
import { userLoginAPI } from '@/api/auth/authAPI';

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user }) {
			if (user.id && user.email) {
				await userLoginAPI(user.id, user.email);
			}
			return true;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
});
