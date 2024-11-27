import Navbar from '@/components/Navbar'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<Navbar />
			<body className='antialiased'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
