import { AlertDialog } from '@/api/ApiResponse'
import CheckSubmit from '@/components/selectAssets/CheckSubmit'
import SelectAssetDrawer from '@/components/selectAssets/SelectAssetDrawer'
import Button from '@/components/ui/button'
import { useAssets } from '@/contexts/AssetsContext'
import { useAuth } from '@/contexts/AuthContext'
import localFont from 'next/font/local'
import Image from 'next/image'
import { useState } from 'react'

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
	const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null)
	const [isOpenSelectDrawer, setIsOpenSelectDrawer] = useState(false)
	const { assets } = useAssets()

	const openSelectDrawer = () => {
		setIsOpenSelectDrawer(true)
	}

	const closeSelectDrawer = () => {
		setIsOpenSelectDrawer(false)
	}

	const [isOpenCheckDrawer, setIsOpenCheckDrawer] = useState(false)

	const openCheckDrawer = () => {
		setIsOpenCheckDrawer(true)
	}
	const closeCheckDrawer = () => {
		setIsOpenCheckDrawer(false)
	}

	const { hasLogin } = useAuth()
	const handleSelectAsset = (assetId: number | undefined) => {
		if (!hasLogin()) {
			AlertDialog('error', '請先登入 可以在左上角找到登入按鈕')
			return
		}
		if (assetId === undefined) return
		setSelectedAssetId(assetId)
		openSelectDrawer()
	}

	return (
		<div
			className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
		>
			<main className='mx-auto mt-5 w-full pb-14 sm:w-[600px] md:w-[700px]'>
				{/* 選擇格個器材借用數量 */}
				<SelectAssetDrawer
					isOpen={isOpenSelectDrawer}
					onClose={closeSelectDrawer}
					assetId={selectedAssetId}
				/>

				{/* 最後確認送出 */}
				<CheckSubmit
					isOpen={isOpenCheckDrawer}
					onOpen={openCheckDrawer}
					onClose={closeCheckDrawer}
				/>

				<section className='space-y-6'>
					{assets.map((asset) => (
						<section
							key={asset.id}
							className='flex rounded-md border-b p-6 sm:bg-slate-200 sm:hover:bg-gray-300 md:border'
						>
							<div className='flex w-full flex-col gap-2'>
								<h3 className='text-xl font-bold'>{asset.name}</h3>
								<p>剩餘數量：{asset.remain}</p>
								<div className='mt-auto flex gap-3'>
									<Button onClick={() => handleSelectAsset(asset.id ?? undefined)}>借用</Button>
								</div>
							</div>
							<div className='ml-20 block'>
								<Image
									loading='lazy'
									src={asset.img}
									width={200}
									height={200}
									alt={asset.name}
									className='rounded-md'
								/>
							</div>
						</section>
					))}
				</section>
			</main>
		</div>
	)
}
