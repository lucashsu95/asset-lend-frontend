import { useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import api from '@/api/api'
import Form from '@/components/Form'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { HStack } from '@chakra-ui/react'

function GoogleLogin() {
	const [loginUrl, setLoginUrl] = useState<string | undefined>(undefined)
	useEffect(() => {
		api
			.getGoogleLogin()
			.then((res) => {
				setLoginUrl(res.data.url)
			})
			.catch((error) => console.error(error))
	}, [])
	return (
		<div className='border-t-2 border-gray-300'>
			<a href={loginUrl}>
				<button
					className='mt-3 grid w-full grid-cols-[1fr_10fr] items-center rounded-md border border-gray-300 px-2 py-3'
					type='button'
				>
					<FcGoogle className='mr-3 h-5 w-5' />
					Sign in with Google
				</button>
			</a>
		</div>
	)
}

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			nickname: '',
			phone: '',
			email: '',
			password: ''
		}
	})

	const onSubmit = () => {
		console.log('submit')

		// if (tabValue === 'login') {
		//   User.login(dispatch, formData).then((res) => {
		//     if (res) {
		//       AlertDialog('success', '登入成功')
		//       navigate('/')
		//     }
		//   })
		// } else {
		//   User.signUp(dispatch, formData)
		// }
	}

	const Demo = () => {
		return (
			<HStack>
				<Button>Click me</Button>
				<Button>Click me</Button>
			</HStack>
		)
	}

	return (
		<div>
			<div className='mt-16'>
				<Demo />
				<Form
					other={<GoogleLogin />}
					title='Login 登入'
					className='mx-auto w-full max-w-[450px] px-5'
					handleSubmit={handleSubmit(onSubmit)}
				>
					<div className='space-y-5'>
						<div className='flex flex-col justify-between *:flex-1'>
							<label className='mb-2 flex items-center' htmlFor='nickname'>
								名稱
							</label>
							<input
								className='input'
								{...register('nickname', {
									required: '必填'
								})}
							/>
							{errors.nickname && <span>{errors.nickname.message}</span>}
						</div>
						<div className='flex flex-col justify-between *:flex-1'>
							<label className='mb-2 flex items-center' htmlFor='phone'>
								手機號碼
							</label>
							<input
								className='input'
								{...register('phone', {
									required: '必填'
								})}
							/>
							{errors.phone && <span>{errors.phone.message}</span>}
						</div>

						<div className='flex flex-col justify-between *:flex-1'>
							<label className='mb-2 flex items-center' htmlFor='email'>
								電子郵件
							</label>
							<input
								className='input'
								{...register('email', {
									required: '必填'
								})}
							/>
							{errors.email && <span>{errors.email.message}</span>}
						</div>

						<div className='flex flex-col justify-between *:flex-1'>
							<label className='mb-2 flex items-center' htmlFor='password'>
								密碼
							</label>
							<input
								className='input'
								{...register('password', {
									required: '必填'
								})}
							/>
							{errors.password && <span>{errors.password.message}</span>}
						</div>
					</div>
				</Form>
			</div>
		</div>
	)
}
