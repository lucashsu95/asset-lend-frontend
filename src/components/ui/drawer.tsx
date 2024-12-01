interface Props {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

export default function Drawer({ isOpen, onClose, children }: Props) {
	return (
		<div
			className={`fixed inset-0 left-0 z-50 bg-black/80 ${isOpen ? 'top-0 opacity-100' : 'top-full opacity-0'}`}
			style={{ transition: 'opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1)' }}
		>
			<div className='absolute inset-0' onClick={onClose}></div>
			<div
				className={`absolute top-full w-full rounded-t-lg bg-white p-6 ${isOpen ? '-translate-y-full' : ''}`}
				style={{ transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)' }}
			>
				<div className='mx-auto mb-5 h-2 w-16 rounded-md bg-gray-300'></div>
				<div className='mx-auto flex max-h-[70vh] min-h-96 w-full max-w-[400px] flex-col items-center overflow-y-auto'>
					{children}
				</div>
			</div>
		</div>
	)
}
