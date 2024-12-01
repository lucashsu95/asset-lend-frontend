import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'

// contexts
import { AssetsProvider } from '@/contexts/AssetsContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { LendsProvider } from '@/contexts/LendsContext'
import { UserProvider } from '@/contexts/UsersContext'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<LendsProvider>
				<UserProvider>
					<AssetsProvider>
						<Navbar />
						<Component {...pageProps} />
					</AssetsProvider>
				</UserProvider>
			</LendsProvider>
		</AuthProvider>
	)
}
