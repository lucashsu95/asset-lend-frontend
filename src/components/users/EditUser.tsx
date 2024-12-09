import { AddUserFormData, useUsers } from '@/contexts/UsersContext'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/button'
import Form from '@/components/ui/form'

interface Props {
	userId: number | null
	onClose: () => void
}

export default function EditUser({ userId, onClose }: Props) {
	const { users, updateUser, addUser } = useUsers()
	const user = users.find((user) => user.id === userId)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<AddUserFormData>({
		defaultValues: {
			name: user?.name || '',
			email: user?.email || '',
			password: '',
			role: user?.role || '使用者'
		}
	})

	const onSubmit = (data: AddUserFormData) => {
		if (userId) {
			updateUser(userId, { ...data, id: userId })
		} else {
			addUser(data)
		}
		onClose()
	}

	return (
		<div>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				title={userId ? '編輯使用者' : '新增使用者'}
				className='h-[400px] px-2 py-0 shadow-none sm:w-[350px]'
			>
				<div>
					<label className='block text-gray-700'>暱稱</label>
					<input
						type='text'
						{...register('name', {
							required: '必填欄位',
							maxLength: { value: 10, message: '名稱最多10個字' }
						})}
						className='input'
					/>
					{errors.name && <p className='text-red-500'>{errors.name.message}</p>}
				</div>
				<div>
					<label className='block text-gray-700'>電子郵件</label>
					<input
						type='email'
						{...register('email', {
							required: '必填欄位',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: '不合法的Email格式'
							}
						})}
						className='input'
					/>
					{errors.email && <p className='text-red-500'>{errors.email.message}</p>}
				</div>
				<div>
					<label className='block text-gray-700'>密碼</label>
					{userId ? (
						<input type='password' {...register('password')} className='input' />
					) : (
						<input
							type='password'
							{...register('password', {
								required: '必填欄位'
							})}
							className='input'
						/>
					)}
					{errors.password && <p className='text-red-500'>{errors.password.message}</p>}
				</div>
				<Button type='submit'>儲存</Button>
			</Form>
		</div>
	)
}
