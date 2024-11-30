import { AssetsProvider } from '@/contexts/AssetsContext'
import { UserProvider } from '@/contexts/UsersContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<AssetsProvider>
				<Component {...pageProps} />
			</AssetsProvider>
		</UserProvider>
	)
}
