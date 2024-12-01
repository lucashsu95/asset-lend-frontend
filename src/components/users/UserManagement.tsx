import { useState } from 'react'

// components & icons
import Dialog from '@/components/ui/dialog'
import Button from '@/components/ui/button'
import EditUser from '@/components/users/EditUser'
import { RiEditBoxFill } from 'react-icons/ri'
import { RiDeleteBinFill } from 'react-icons/ri'

// context
import { useUsers } from '@/contexts/UsersContext'

const UserManagement = () => {
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
	// edit dialog
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

	const openEditDialog = (userId: number | null) => {
		setSelectedUserId(userId)
		setIsAddDialogOpen(true)
	}

	const closeEditDialog = () => {
		setIsAddDialogOpen(false)
		setSelectedUserId(null)
	}

	const { users, deleteUser } = useUsers()

	// delete dialog
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const openDeleteDialog = (userId: number | null) => {
		setSelectedUserId(userId)
		setIsDeleteDialogOpen(true)
	}

	const closeDeleteDialog = () => {
		setIsDeleteDialogOpen(false)
		setSelectedUserId(null)
	}

	const handleDelete = (id: number | null) => {
		if (id === null) return
		deleteUser(id)
		closeDeleteDialog()
	}

	return (
		<>
			<section>
				<Button onClick={() => openEditDialog(null)}>新增使用者</Button>
				<Dialog isOpen={isAddDialogOpen} onClose={closeEditDialog}>
					<EditUser userId={selectedUserId} onClose={closeEditDialog} />
				</Dialog>
				<Dialog isOpen={isDeleteDialogOpen} onClose={closeDeleteDialog}>
					<div className='w-[90vw] p-4 sm:w-[300px] md:w-[500px]'>
						<h2 className='text-xl font-bold'>刪除使用者</h2>
						<p className='my-2'>確定要刪除使用者嗎？</p>
						<div className='mt-4 flex justify-end gap-2'>
							<Button onClick={() => handleDelete(selectedUserId)}>刪除</Button>
							<Button variant='outline' onClick={closeDeleteDialog}>
								取消
							</Button>
						</div>
					</div>
				</Dialog>
			</section>

			<section className='mt-4 overflow-x-auto'>
				<div className='custom-table min-w-[500px] *:grid-cols-[1fr_2fr_2fr_1fr]'>
					<div className='custom-table-row bg-slate-300 *:py-2'>
						<h2>
							<span>使用者 ID</span>
						</h2>
						<h2>
							<span>電子郵件</span>
						</h2>
						<h2>
							<span>權限</span>
						</h2>
						<h2>
							<span>操作</span>
						</h2>
					</div>
					{users.map((user) => (
						<div key={user.id} className='custom-table-row *:py-1 odd:bg-white even:bg-slate-50'>
							<div>{user.id}</div>
							<div>{user.email}</div>
							<div>{user.role}</div>
							<div className='flex gap-2'>
								<Button
									size='icon'
									variant='warning'
									onClick={() => openEditDialog(user.id ?? null)}
								>
									<RiEditBoxFill />
								</Button>
								<Button
									size='icon'
									variant='danger'
									onClick={() => openDeleteDialog(user.id ?? null)}
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

export default UserManagement
