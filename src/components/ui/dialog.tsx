import React from 'react'

interface DialogProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null

	return (
		<>
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
				<div className='fixed inset-0' onClick={onClose}></div>
				<div className='relative rounded bg-white p-6 shadow-lg'>
					<button
						onClick={onClose}
						className='absolute right-2 top-2 mr-2 text-2xl text-gray-500 hover:text-gray-700'
						aria-label='Close'
					>
						&times;
					</button>
					{children}
				</div>
			</div>
		</>
	)
}

export default Dialog
