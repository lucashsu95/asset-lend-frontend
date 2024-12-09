import React, { useState } from 'react'

// components & icons
import Dialog from '@/components/ui/dialog'
import Button from '@/components/ui/button'
import { RiDeleteBinFill } from 'react-icons/ri'

// context
import { useLends } from '@/contexts/LendsContext'

const LendManagement = () => {
	const [selectedLendId, setSelectedLendId] = useState<number | null>(null)
	const { lends, deleteLend } = useLends()

	// delete dialog
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const openDeleteDialog = (lendId: number | null) => {
		setSelectedLendId(lendId)
		setIsDeleteDialogOpen(true)
	}

	const closeDeleteDialog = () => {
		setIsDeleteDialogOpen(false)
		setSelectedLendId(null)
	}

	const handleDelete = (id: number | null) => {
		if (id === null) return
		deleteLend(id)
		closeDeleteDialog()
	}

	return (
		<>
			<section>
				<Dialog isOpen={isDeleteDialogOpen} onClose={closeDeleteDialog}>
					<div className='w-[90vw] p-4 sm:w-[300px] md:w-[500px]'>
						<h2 className='text-xl font-bold'>刪除出借記錄</h2>
						<p className='my-2'>確定要刪除出借記錄嗎？</p>
						<div className='mt-4 flex justify-end gap-2'>
							<Button onClick={() => handleDelete(selectedLendId)}>刪除</Button>
							<Button variant='outline' onClick={closeDeleteDialog}>
								取消
							</Button>
						</div>
					</div>
				</Dialog>
			</section>

			<section className='mt-4 w-[200px] overflow-x-auto sm:w-full'>
				<div className='custom-table min-w-[600px] *:grid-cols-[2fr_2fr_2fr_1fr]'>
					<div className='custom-table-row bg-slate-300 *:py-2'>
						<h2>
							<span>借用人 / 器材名稱</span>
						</h2>
						<h2>
							<span>借用日期</span>
						</h2>
						<h2>
							<span>歸還日期</span>
						</h2>
						<h2>
							<span>操作</span>
						</h2>
					</div>
					{lends.map((lend) => (
						<React.Fragment key={lend.id}>
							<div className='custom-table-row bg-slate-200 *:py-1'>
								<div>{lend.user_name}</div>
								<div>{lend.lend_date}</div>
								<div></div>
								<div className='flex gap-2'>
									<Button
										size='icon'
										variant='danger'
										onClick={() => openDeleteDialog(lend.id ?? null)}
									>
										<RiDeleteBinFill />
									</Button>
								</div>
							</div>
							{lend.lend_assets.map((asset, index) => (
								<div key={`asset-${index}`} className='custom-table-row *:py-1'>
									<div>{asset.asset_name}</div>
									<div>{asset.lend_amount}</div>
									<div>{asset.return_date ?? '尚未歸還'}</div>
									<div className='flex gap-2'>
										<Button
											size='icon'
											variant='danger'
											onClick={() => openDeleteDialog(lend.id ?? null)}
										>
											<RiDeleteBinFill />
										</Button>
									</div>
								</div>
							))}
						</React.Fragment>
					))}
				</div>
			</section>
		</>
	)
}

export default LendManagement
