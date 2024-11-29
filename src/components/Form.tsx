import PropTypes from 'prop-types'

interface FormProps {
	title?: string | React.ReactNode
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
	children: React.ReactNode
	other?: React.ReactNode
	className?: string
}

export default function Form({ title, handleSubmit, children, other, className }: FormProps) {
	return (
		<div className={`h-min py-5 ${className}`}>
			{title && (
				<div>
					<div>{title}</div>
				</div>
			)}
			<section>
				<form onSubmit={handleSubmit} className='space-y-4'>
					{children}
					<button type='submit' className='w-full'>
						送出
					</button>
					{other}
				</form>
			</section>
		</div>
	)
}
Form.propTypes = {
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	handleSubmit: PropTypes.func,
	children: PropTypes.node.isRequired,
	other: PropTypes.node
}
