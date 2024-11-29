import { AppProps } from 'next/app'
import { UserProvider } from '../context/UsersContext'
import { SportsProvider } from '../context/SportsContext'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<SportsProvider>
				<Component {...pageProps} />
			</SportsProvider>
		</UserProvider>
	)
}

export default MyApp
