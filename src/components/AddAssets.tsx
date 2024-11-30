import { useState } from 'react'
import Dialog from '@/components/ui/dialog'

const AddAsset = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const openDialog = () => setIsDialogOpen(true)
	const closeDialog = () => setIsDialogOpen(false)

	return (
		<div>
			<button onClick={openDialog}>新增器材</button>
			<Dialog isOpen={isDialogOpen} onClose={closeDialog}>
				<h2>新增器材</h2>
				{/* 這裡可以放置登入表單 */}
			</Dialog>
		</div>
	)
}

export default AddAsset
