import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MContextProvider } from '@/context/MainContext';
import { SessionProvider } from 'next-auth/react';
import { ProtectedLayout } from '@/components/protectedLayout';
import { Della_Respira } from 'next/font/google';

const della = Della_Respira({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-della',
});

type AppPropsWithAuth = AppProps & {
	Component: {
		requireAuth?: boolean;
	};
};

// to protect the page:
// Component.requireAuth = true;

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppPropsWithAuth) {
	return (
		<SessionProvider session={session}>
			<MContextProvider>
				{Component.requireAuth ? (
					<ProtectedLayout>
						<main className={`${della.variable}`}>
							<Component {...pageProps} />
						</main>
					</ProtectedLayout>
				) : (
					<main className={`${della.variable}`}>
						<Component {...pageProps} />
					</main>
				)}
			</MContextProvider>
		</SessionProvider>
	);
}
