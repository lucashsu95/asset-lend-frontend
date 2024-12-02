import { FaPlus, FaMinus } from 'react-icons/fa6'

import Drawer from '@/components/ui/drawer'
import Button from '@/components/ui/button'

import Image from 'next/image'
import { useSelectedAssets } from '@/contexts/SelectedAssetsContext'
import { useLends } from '@/contexts/LendsContext'
import { useAuth } from '@/contexts/AuthContext'
import { useAssets } from '@/contexts/AssetsContext'
import { useRouter } from 'next/router'

interface Props {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export default function CheckSubmit({ isOpen, onOpen, onClose }: Props) {
	const { selectedAssets, editSelectedAssetAmount } = useSelectedAssets()

	const { currentUser } = useAuth()
	const { addLend } = useLends()
	const { updateReamin } = useAssets()
	const router = useRouter()

	const handleSubmit = () => {
		if (currentUser === null) return
		addLend({
			user_name: currentUser.name,
			lend_assets: selectedAssets.map((selectedAsset) => ({
				return_date: null,
				asset_id: selectedAsset.id,
				asset_name: selectedAsset.name,
				lend_amount: selectedAsset.lend_amount
			}))
		})

		selectedAssets.forEach((selectedAsset) => {
			console.log('asset:', selectedAsset)

			updateReamin(selectedAsset.id, selectedAsset.lend_amount)
		})
		onClose()
		router.push('/lends')
	}

	return (
		<>
			<div className='fixed bottom-0 left-0 z-40 flex h-16 w-full items-center bg-white px-8 shadow-md'>
				<Button className='mx-auto w-full max-w-[600px]' onClick={() => onOpen()}>
					確認送出
				</Button>
			</div>
			<Drawer isOpen={isOpen} onClose={onClose}>
				{selectedAssets.length > 0 ? (
					<>
						<div className='h-[65vh] w-full overflow-y-auto px-5'>
							{selectedAssets.map((selectedAsset, index) => {
								return (
									<div
										key={index}
										className='grid grid-cols-[1fr_3fr] gap-2 py-3 [&:not(:last-child)]:border-b-2'
									>
										<div className='flex flex-col gap-3'>
											<h3 className='text-xl font-bold'>{selectedAsset.name}</h3>

											<div className='grid grid-cols-[1fr_2fr_1fr] items-center overflow-hidden rounded-md border'>
												<Button
													variant='ghost'
													onClick={() =>
														editSelectedAssetAmount({
															...selectedAsset,
															lend_amount: selectedAsset.lend_amount + 1
														})
													}
												>
													<FaPlus />
												</Button>
												<div className='px-5 text-center font-bold text-gray-600'>
													{selectedAsset.lend_amount}
												</div>
												<Button
													variant='ghost'
													onClick={() =>
														editSelectedAssetAmount({
															...selectedAsset,
															lend_amount: selectedAsset.lend_amount - 1
														})
													}
												>
													<FaMinus />
												</Button>
											</div>
										</div>
										<div>
											<Image
												src={selectedAsset.img}
												width={100}
												height={100}
												alt={selectedAsset.name}
												className='ml-auto rounded-md'
											/>
										</div>
									</div>
								)
							})}
						</div>
						<Button className='mt-10 w-full' onClick={() => handleSubmit()}>
							送出
						</Button>
					</>
				) : (
					<div className='text-center text-xl font-bold'>目前沒有選擇要借用的器材</div>
				)}
			</Drawer>
		</>
	)
}
