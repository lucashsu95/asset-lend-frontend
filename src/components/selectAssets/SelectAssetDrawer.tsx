import { useState } from 'react'

import Drawer from '@/components/ui/drawer'
import Button from '@/components/ui/button'

import { FaPlus, FaMinus } from 'react-icons/fa6'

import { useAssets } from '@/contexts/AssetsContext'
import Image from 'next/image'
import { useSelectedAssets } from '@/contexts/SelectedAssetsContext'

interface Props {
	assetId: number | null
	isOpen: boolean
	onClose: () => void
}

export default function SelectAssetDrawer({ assetId, isOpen, onClose }: Props) {
	const [amount, setAmount] = useState(1)
	const { assets } = useAssets()
	const { editSelectedAssetAmount } = useSelectedAssets()
	const asset = assets.find((asset) => asset.id === assetId)
	const handleSelected = () => {
		if (assetId === null || asset == null) return
		editSelectedAssetAmount({
			asset_id: assetId,
			name: asset.name,
			img: asset.img,
			lend_amount: amount
		})
		onClose()
		setAmount(1)
	}

	return (
		<Drawer isOpen={isOpen} onClose={onClose}>
			{asset && (
				<>
					<h3 className='mb-4 text-2xl font-bold'>{asset.name}</h3>
					<Image
						loading='lazy'
						src='https://picsum.photos/200'
						width={200}
						height={200}
						alt={asset.name}
						className='mb-2 rounded-md'
					/>
					<div className='flex w-full items-center justify-center'>
						<Button
							variant='outline'
							size='icon'
							className='rounded-full'
							onClick={() => setAmount(amount - 1)}
							disabled={amount <= 1}
						>
							<FaMinus className='h-4 w-4' />
							<span className='sr-only'>Decrease</span>
						</Button>
						<div className='mt-5 flex-1 text-center'>
							<div className='text-[72px] font-bold tracking-tighter'>{amount}</div>
							<div className='text-muted-foreground text-sm uppercase'>數量</div>
						</div>
						<Button
							variant='outline'
							size='icon'
							className='rounded-full'
							onClick={() => setAmount(amount + 1)}
							disabled={amount >= (asset.remain ?? 0)}
						>
							<FaPlus className='h-4 w-4' />
							<span className='sr-only'>Increase</span>
						</Button>
					</div>
					<Button onClick={() => handleSelected()} className='mt-4 w-full'>
						加入借用
					</Button>
				</>
			)}
		</Drawer>
	)
}
