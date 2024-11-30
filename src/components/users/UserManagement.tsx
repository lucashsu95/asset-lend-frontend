import React, { useState } from 'react'
import Dialog from '@/components/ui/dialog'
import EditUser from '@/components/users/EditUser'
import Button from '../ui/button'

const UserManagement = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

	const openDialog = (userId: number | null) => {
		setSelectedUserId(userId)
		setIsDialogOpen(true)
	}

	const closeDialog = () => {
		setIsDialogOpen(false)
		setSelectedUserId(null)
	}

	return (
		<div>
			<h1>User Management</h1>
			{/* 這裡可以放置用戶列表和編輯按鈕 */}
			<Button onClick={() => openDialog(null)}>新增使用者</Button>
			<Dialog isOpen={isDialogOpen} onClose={closeDialog}>
				{selectedUserId !== null && <EditUser userId={selectedUserId} onClose={closeDialog} />}
			</Dialog>
		</div>
	)
}

export default UserManagement
