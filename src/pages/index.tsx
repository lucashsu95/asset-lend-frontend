import Button from '@/components/ui/button'
import localFont from 'next/font/local'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
})

export default function Home() {
	return (
		<div
			className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
		>
			<main className='mx-auto w-[80%]'>
				<Button onClick={() => console.log('新增器材')} className='mt-5' variant='success'>
					新增器材
				</Button>
			</main>
		</div>
	)
}
