interface Props {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

export default function Sheet({ isOpen, onClose, children }: Props) {
	return (
		<div
			className={`fixed top-0 z-50 h-screen w-screen bg-black/80 ${isOpen ? 'right-0 opacity-100' : 'right-full opacity-0'}`}
			style={{ transition: 'opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1)' }}
		>
			<div className='absolute inset-0' onClick={onClose}></div>
			<div
				className={`absolute right-full top-0 w-[200px] bg-white p-6 ${isOpen ? 'translate-x-full' : ''}`}
				style={{ transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)' }}
			>
				<button
					onClick={onClose}
					className='absolute right-2 top-2 mr-2 text-2xl text-gray-500 hover:text-gray-700'
					aria-label='Close'
				>
					&times;
				</button>
				<div className='mx-auto flex h-screen flex-col p-3'>{children}</div>
			</div>
		</div>
	)
}
