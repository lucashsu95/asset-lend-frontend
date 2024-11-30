import { ReactNode } from 'react'

interface FormProps {
	onSubmit: () => void
	children: ReactNode
	title: string
	other?: ReactNode
	className?: string
}

const Form = ({ other, onSubmit, children, title, className }: FormProps) => {
	return (
		<form
			onSubmit={onSubmit}
			className={`flex w-full max-w-sm flex-col justify-center rounded bg-white p-6 shadow-md ${className}`}
		>
			<h2 className='mb-4 text-xl font-bold'>{title}</h2>
			<div className='space-y-4'>{children}</div>
			{other && <div className='mt-4 border-t pt-5'>{other}</div>}
		</form>
	)
}

export default Form
