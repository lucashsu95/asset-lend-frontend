interface FormProps {
	title?: string | React.ReactNode
	children: React.ReactNode
	other?: React.ReactNode
	className?: string
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function Form({ title, children, handleSubmit, other, className }: FormProps) {
	return (
		<div className={`h-min py-5 ${className}`}>
			{title && (
				<div className='mb-5 text-center text-xl font-bold'>
					<div>{title}</div>
				</div>
			)}
			<section>
				<form className='space-y-5' onSubmit={handleSubmit}>
					{children}
					<button type='submit' className='btn-primary w-full'>
						送出
					</button>
					{other}
				</form>
			</section>
		</div>
	)
}
