import { useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import api from '@/api/api'
import Form from '@/components/Form'
// import { AlertDialog } from '@/api/ApiResponse'

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
				<button className='mt-3 w-full border border-gray-300' type='button'>
					<FcGoogle className='mr-3 h-5 w-5' />
					Sign in with Google
				</button>
			</a>
		</div>
	)
}

export default function Login() {
	const [formData, setFormData] = useState({
		nickname: '',
		email: '',
		phone: '',
		password: ''
	})

	const { nickname, email, phone, password } = formData

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault()

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

	return (
		<div className='mx-auto max-w-[450px]'>
			<div className='mt-16'>
				<Form
					className='w-10'
					other={<GoogleLogin />}
					title='Login 登入'
					handleSubmit={handleSubmit}
				>
					<h2>登入</h2>

					<div className='space-y-2'>
						<label htmlFor='nickname'>名稱</label>
						<input
							id='nickname'
							name='nickname'
							type='nickname'
							value={nickname}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='space-y-2'>
						<label htmlFor='phone'>手機號碼</label>
						<input
							id='phone'
							name='phone'
							type='text'
							value={phone}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='space-y-2'>
						<label htmlFor='email'>電子郵件</label>
						<input
							id='email'
							name='email'
							type='email'
							value={email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='space-y-2'>
						<label htmlFor='password'>密碼</label>
						<input
							id='password'
							name='password'
							type='password'
							value={password}
							onChange={handleChange}
							required
						/>
					</div>
				</Form>
			</div>
		</div>
	)
}
