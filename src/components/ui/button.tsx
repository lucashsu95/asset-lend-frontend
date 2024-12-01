import React from 'react'

interface ButtonProps {
	size?: 'sm' | 'lg' | 'default' | 'icon'
	className?: string
	onClick?: () => void
	children: React.ReactNode
	type?: 'button' | 'submit' | 'reset'
	variant?: keyof typeof variantClass
}

const variantClass = {
	default: 'bg-slate-900 text-white',
	primary: 'bg-primary text-white',
	secondary: 'bg-slate-200',
	success: 'bg-success',
	danger: 'bg-danger',
	warning: 'bg-warning',
	info: 'bg-info',
	outline: 'border border-slate-500 text-slate-800'
}

const sizeClass = {
	default: 'h-9 px-4 py-2',
	sm: 'h-8 rounded-md px-3 text-xs',
	lg: 'h-10 rounded-md px-8',
	icon: 'h-9 w-9 inline-flex justify-center items-center'
}

const Button = ({
	size = 'default',
	className,
	variant = 'default',
	onClick,
	children,
	type = 'button',
	...props
}: ButtonProps) => {
	return (
		<button
			type={type}
			className={`cursor-pointer rounded-md transition-transform duration-300 hover:brightness-90 ${sizeClass[size]} ${className} ${variantClass[variant]} `}
			{...props}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button
