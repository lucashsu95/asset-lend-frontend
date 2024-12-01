import Button from '@/components/ui/button'
import { useAssets } from '@/contexts/AssetsContext'
import localFont from 'next/font/local'
import Image from 'next/image'

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
	const { assets } = useAssets()

	return (
		<div
			className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
		>
			<main className='mx-auto mt-5 w-full space-y-6 sm:w-[600px] md:w-[700px]'>
				{assets.map((asset) => (
					<section key={asset.id} className='flex rounded-md border p-6 hover:bg-gray-200'>
						<div className='flex w-full flex-col gap-2'>
							<h3 className='text-xl font-bold'>{asset.name}</h3>
							<p>剩餘數量：{asset.amount}</p>
							<div className='mt-auto flex gap-3'>
								<Button>借用</Button>
							</div>
						</div>
						<div className='ml-20 block'>
							<Image
								loading='lazy'
								src='https://picsum.photos/200'
								width={200}
								height={200}
								alt={asset.name}
								className='rounded-md'
							/>
						</div>
					</section>
				))}
			</main>
		</div>
	)
}
