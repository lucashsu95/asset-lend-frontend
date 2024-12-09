import { useState } from 'react'

// components & icons
import Dialog from '@/components/ui/dialog'
import Button from '@/components/ui/button'
import { RiEditBoxFill } from 'react-icons/ri'
import { RiDeleteBinFill } from 'react-icons/ri'

// context
import { useAssets } from '@/contexts/AssetsContext'
import EditAssets from './EditAssets'
import Image from 'next/image'

const AssetManagement = () => {
	const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null)
	// edit dialog
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

	const openEditDialog = (assetId: number | null) => {
		setSelectedAssetId(assetId)
		setIsAddDialogOpen(true)
	}

	const closeEditDialog = () => {
		setIsAddDialogOpen(false)
		setSelectedAssetId(null)
	}

	const { assets, deleteAsset } = useAssets()

	// delete dialog
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const openDeleteDialog = (assetId: number | null) => {
		setSelectedAssetId(assetId)
		setIsDeleteDialogOpen(true)
	}

	const closeDeleteDialog = () => {
		setIsDeleteDialogOpen(false)
		setSelectedAssetId(null)
	}

	const handleDelete = (id: number | null) => {
		if (id === null) return
		deleteAsset(id)
		closeDeleteDialog()
	}

	return (
		<>
			<section>
				<Button onClick={() => openEditDialog(null)}>新增體育器材</Button>
				<Dialog isOpen={isAddDialogOpen} onClose={closeEditDialog}>
					<EditAssets assetId={selectedAssetId} onClose={closeEditDialog} />
				</Dialog>
				<Dialog isOpen={isDeleteDialogOpen} onClose={closeDeleteDialog}>
					<div className='w-[90vw] p-4 sm:w-[300px] md:w-[500px]'>
						<h2 className='text-xl font-bold'>刪除體育器材</h2>
						<p className='my-2'>確定要刪除體育器材嗎？</p>
						<div className='mt-4 flex justify-end gap-2'>
							<Button onClick={() => handleDelete(selectedAssetId)}>刪除</Button>
							<Button variant='outline' onClick={closeDeleteDialog}>
								取消
							</Button>
						</div>
					</div>
				</Dialog>
			</section>

			<section className='mt-4 w-[200px] overflow-x-auto sm:w-full'>
				<div className='custom-table min-w-[600px] *:grid-cols-[1fr_2fr_2fr_1fr_1fr]'>
					<div className='custom-table-row bg-slate-300 *:py-2'>
						<h2>
							<span>器材示意圖</span>
						</h2>
						<h2>
							<span>名稱</span>
						</h2>
						<h2>
							<span>總數量</span>
						</h2>
						<h2>
							<span>剩餘數量</span>
						</h2>
						<h2>
							<span>操作</span>
						</h2>
					</div>
					{assets.map((asset) => (
						<div key={asset.id} className='custom-table-row *:py-1 odd:bg-white even:bg-slate-50'>
							<div>
								<Image
									src={asset.img}
									width={100}
									height={100}
									alt={asset.name}
									className='h-20 w-20 rounded object-cover'
								/>
							</div>
							<div>{asset.name}</div>
							<div>{asset.amount}</div>
							<div>{asset.remain}</div>
							<div className='flex gap-2'>
								<Button
									size='icon'
									variant='warning'
									onClick={() => openEditDialog(asset.id ?? null)}
								>
									<RiEditBoxFill />
								</Button>
								<Button
									size='icon'
									variant='danger'
									onClick={() => openDeleteDialog(asset.id ?? null)}
								>
									<RiDeleteBinFill />
								</Button>
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	)
}

export default AssetManagement
