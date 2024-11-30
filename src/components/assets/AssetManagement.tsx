import { useState } from 'react'

// components & icons
import Dialog from '@/components/ui/dialog'
import Button from '@/components/ui/button'
// import { RiEditBoxFill } from 'react-icons/ri'
import { RiDeleteBinFill } from 'react-icons/ri'
import { useAssets } from '@/contexts/AssetsContext'

// context

const AssetManagement = () => {
	const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null)
	// edit dialog
	// const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

	// const openEditDialog = (assetId: number | null) => {
	// 	setSelectedAssetId(assetId)
	// 	setIsAddDialogOpen(true)
	// }

	// const closeEditDialog = () => {
	// 	setIsAddDialogOpen(false)
	// 	setSelectedAssetId(null)
	// }

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
				{/* <Button onClick={() => openEditDialog(null)}>新增使用者</Button>
				<Dialog isOpen={isAddDialogOpen} onClose={closeEditDialog}>
					<EditAsset userId={selectedAssetId} onClose={closeEditDialog} />
				</Dialog> */}
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

			<section className='mt-4 overflow-x-auto rounded-md rounded-b-none border border-gray-300 pb-3'>
				<div className='w-full min-w-[500px] *:*:flex *:grid *:grid-cols-[1fr_2fr_2fr_1fr] *:*:items-center *:*:justify-center *:*:border-r *:*:py-0.5'>
					<div className='bg-slate-300 *:py-2'>
						<h2>
							<span>器材 ID</span>
						</h2>
						<h2>
							<span>名稱</span>
						</h2>
						<h2>
							<span>總數量</span>
						</h2>
						<h2>
							<span>操作</span>
						</h2>
					</div>
					{assets.map((asset) => (
						<div key={asset.id}>
							<div>{asset.id}</div>
							<div>{asset.name}</div>
							<div>{asset.amount}</div>
							<div className='flex gap-2'>
								{/* <Button
									size='icon'
									variant='warning'
									onClick={() => openEditDialog(asset.id ?? null)}
								>
									<RiEditBoxFill />
								</Button> */}
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
