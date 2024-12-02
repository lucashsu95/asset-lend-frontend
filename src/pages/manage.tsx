import { AlertDialog } from '@/api/ApiResponse'
import AssetManagement from '@/components/assets/AssetManagement'
import LendManagement from '@/components/lends/LendManagement'
import Loading from '@/components/Loading'
import Button from '@/components/ui/button'
import UserManagement from '@/components/users/UserManagement'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { RiArrowRightSLine } from 'react-icons/ri'

const pages = ['借用管理', '器材管理', '使用者管理']

export default function Home() {
	const [currentPage, setCurrentPage] = useState<number>(0)
	const router = useRouter()
	const { hasLogin, hasPermission, loading } = useAuth()

	useEffect(() => {
		if (loading) return
		if (!hasLogin()) {
			router.push('/login')
			return
		}
		if (!hasPermission('manage')) {
			AlertDialog('error', '權限不足')
			router.push('/')
			return
		}
	}, [hasLogin, hasPermission, loading, router])

	if (loading) {
		return <Loading />
	}

	return (
		<div className='flex bg-gray-100'>
			{/* Left Sidebar */}
			<section className='w-44 space-y-3 bg-gray-900 p-4 text-white'>
				{pages.map((name, index) => (
					<Button
						variant='ghost'
						key={`pageName-${index}`}
						onClick={() => setCurrentPage(index)}
						className={`group flex w-full cursor-pointer text-left text-gray-200 hover:bg-gray-600/70 ${currentPage === index ? 'bg-gray-600/70' : ''}`}
					>
						{name}
						<RiArrowRightSLine
							className={`my-auto ml-auto flex transition-transform duration-300 group-hover:translate-x-2 ${currentPage === index ? 'translate-x-2' : ''}`}
						/>
					</Button>
				))}
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

				{/* List */}
				<div className='p-6'>
					{hasPermission('manage') && (
						<>
							{currentPage === 0 && <LendManagement />}
							{currentPage === 1 && <AssetManagement />}
							{currentPage === 2 && <UserManagement />}
						</>
					)}
				</div>
			</section>
		</div>
	)
}
