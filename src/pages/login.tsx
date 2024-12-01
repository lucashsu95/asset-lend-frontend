import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'

import Form from '@/components/ui/form'
import Button from '@/components/ui/button'
import { LoginFormData, SignUpFormData, useAuth } from '@/contexts/AuthContext'

const Login = () => {
	const [isLogin, setIsLogin] = useState(true)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<SignUpFormData>({
		defaultValues: { name: '', email: '', password: '' }
	})

	const { login, signUp } = useAuth()

	const onSubmit = (data: SignUpFormData) => {
		if (isLogin) {
			login(data as LoginFormData)
		} else {
			signUp(data)
		}
		console.log(data)
	}

	return (
		<div className='flex min-h-[80vh] flex-col items-center justify-center'>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				title={isLogin ? '登入' : '註冊'}
				other={
					<Button
						className='grid w-full grid-cols-[1fr_10fr] items-center'
						variant='outline'
						size='lg'
					>
						<FcGoogle className='h-5 w-5' />
						{isLogin ? 'Login with Google' : 'Sign up with Google'}
					</Button>
				}
			>
				{!isLogin && (
					<div>
						<label className='block text-gray-700'>Name</label>
						<input
							type='text'
							{...register('name', {
								required: '必填欄位'
							})}
							className='input'
						/>
						{errors.name && <p className='text-red-500'>{errors.name.message}</p>}
					</div>
				)}
				<div>
					<label className='block text-gray-700'>Email</label>
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
					<label className='block text-gray-700'>Password</label>
					<input
						type='password'
						{...register('password', {
							required: '必填欄位'
						})}
						className='input'
					/>
					{errors.password && <p className='text-red-500'>{errors.password.message}</p>}
				</div>
				<Button type='submit' className='w-full' size='lg'>
					{isLogin ? '登入' : '註冊'}
				</Button>
			</Form>
			<Button className='mt-3' variant='link' onClick={() => setIsLogin(!isLogin)}>
				{isLogin ? '沒有帳號？註冊' : '已有帳號？登入'}
			</Button>
		</div>
	)
}

export default Login
