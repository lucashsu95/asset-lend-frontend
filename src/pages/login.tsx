import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'

import Form from '@/components/ui/form'
import Button from '@/components/ui/button'

interface LoginFormInputs {
	email: string
	password: string
}

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormInputs>()

	const onSubmit = (data: LoginFormInputs) => {
		console.log(data)
	}

	return (
		<div className='flex min-h-[80vh] flex-col items-center justify-center'>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				title='登入'
				other={
					<Button className='btn grid w-full grid-cols-[1fr_10fr] items-center border'>
						<FcGoogle className='mr-2 h-5 w-5' /> Login with Google
					</Button>
				}
			>
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
				<Button type='submit' className='w-full' variant='primary'>
					Login
				</Button>
			</Form>
		</div>
	)
}

export default Login
