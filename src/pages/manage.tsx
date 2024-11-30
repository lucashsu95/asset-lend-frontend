import AssetManagement from '@/components/assets/AssetManagement'
import Button from '@/components/ui/button'
import UserManagement from '@/components/users/UserManagement'
import { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

export default function Home() {
	const [currentPage, setCurrentPage] = useState(0)
	const pages = ['使用者管理', '體育器材管理']

	return (
		<div className='flex bg-gray-100'>
			{/* Left Sidebar */}
			<section className='w-44 bg-gray-900 p-4 text-center text-white'>
				<h2 className='mb-6 text-2xl font-bold'>後台管理</h2>
				<div className='space-y-3'>
					{pages.map((name, index) => (
						<Button
							key={`pageName-${index}`}
							onClick={() => setCurrentPage(index)}
							className='w-full cursor-pointer hover:bg-gray-600/70'
						>
							{name}
						</Button>
					))}
				</div>
			</section>

			{/* Main Content */}
			<section className='flex min-h-screen flex-1 flex-col'>
				{/* Top Content */}
				<div className='flex items-center bg-white p-4 shadow-md'>
					<div className='relative w-full'>
						<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>
							<RiSearch2Line className='h-5 w-5' />
						</div>
						<input className='input pl-10' />
					</div>
				</div>

				{/* Product List */}
				<div className='p-6'>
					{currentPage === 0 && <UserManagement />}
					{currentPage === 1 && <AssetManagement />}
				</div>
			</section>
		</div>
	)
}
