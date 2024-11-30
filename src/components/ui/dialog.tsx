import React from 'react'
import Button from '@/components/ui/button'

interface DialogProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='rounded bg-white p-6 shadow-lg'>
				{children}
				<Button onClick={onClose} className='mt-4 bg-red-500 text-white'>
					Close
				</Button>
			</div>
		</div>
	)
}

export default Dialog
