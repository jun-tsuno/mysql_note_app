import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { NoteContextProvider } from '@/context/NoteContext';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NoteContextProvider>
			<Component {...pageProps} />
		</NoteContextProvider>
	);
}
