// FILE: @/component/ui/button.jsx
import React from 'react'

interface ButtonProps {
	size?: 'sm' | 'lg'
	className?: string
	onClick?: () => void
	children: React.ReactNode
	type?: 'button' | 'submit' | 'reset'
	variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success'
}

const tables = {
	primary: 'btn-primary',
	secondary: 'btn-secondary',
	danger: 'btn-danger',
	warning: 'btn-warning',
	success: 'btn-success'
}

const Button = ({
	size,
	className,
	variant = 'primary',
	onClick,
	children,
	type = 'button',
	...props
}: ButtonProps) => {
	let sizeClass = ''
	if (size === 'lg') {
		sizeClass = 'px-6 py-3 text-lg'
	} else if (size === 'sm') {
		sizeClass = 'px-2 py-1 text-sm'
	} else {
		sizeClass = 'px-4 py-2'
	}

	return (
		<button
			type={type}
			className={`btn ${sizeClass} ${className} ${tables[variant]}`}
			{...props}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button
