import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MContextProvider } from '@/context/MainContext';
import { SessionProvider } from 'next-auth/react';
import { ProtectedLayout } from '@/components/protectedLayout';

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
						<Component {...pageProps} />
					</ProtectedLayout>
				) : (
					<Component {...pageProps} />
				)}
			</MContextProvider>
		</SessionProvider>
	);
}
