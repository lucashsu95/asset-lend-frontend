import Form from '@/components/Form'
import localFont from 'next/font/local'
import { useForm } from 'react-hook-form'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
})

const handleNull =() => {

}

export default function Home() {
	const { register, handleSubmit } = useForm()

	const onSubmit = () => {}

	handleSubmit(onSubmit)

	return (
		<div
			className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
		>
			<main className='mx-auto w-[80%]'>
				<Form title='器材借用' className='mx-auto w-[450px]' handleSubmit={handleNull}>
					<div className='space-y-7'>
						<div className='flex justify-between'>
							<label htmlFor='nickname'>名稱</label>
							<input
								className='input'
								{...register('nickname', {
									required: '必填'
								})}
							/>
						</div>
						<div className='flex justify-between'>
							<label htmlFor='phone'>手機號碼</label>
							<input
								className='input'
								{...register('phone', {
									required: '必填'
								})}
							/>
						</div>

						<div className='flex justify-between'>
							<label htmlFor='email'>電子郵件</label>
							<input
								className='input'
								{...register('email', {
									required: '必填'
								})}
							/>
						</div>

						<div className='flex justify-between'>
							<label htmlFor='password'>密碼</label>
							<input
								className='input'
								{...register('password', {
									required: '必填'
								})}
							/>
						</div>
					</div>
				</Form>
			</main>
		</div>
	)
}
