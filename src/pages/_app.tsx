import { AuthProvider } from '@/contexts/AuthContext'
import { SelectedAssetsProvider } from '@/contexts/SelectedAssetsContext'
import { AssetsProvider } from '@/contexts/AssetsContext'
import { LendsProvider } from '@/contexts/LendsContext'
import { UserProvider } from '@/contexts/UsersContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<SelectedAssetsProvider>
				<LendsProvider>
					<UserProvider>
						<AssetsProvider>
							<Navbar />
							<Component {...pageProps} />
						</AssetsProvider>
					</UserProvider>
				</LendsProvider>
			</SelectedAssetsProvider>
		</AuthProvider>
	)
}
