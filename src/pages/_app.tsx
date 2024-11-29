import { SportsProvider } from '@/context/SportsContext'
import { UserProvider } from '@/context/UsersContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<SportsProvider>
				<Component {...pageProps} />
			</SportsProvider>
		</UserProvider>
	)
}
