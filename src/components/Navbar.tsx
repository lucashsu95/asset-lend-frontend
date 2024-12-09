import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import Button from './ui/button'
// import Sheet from './ui/sheet'
// import { useState } from 'react'
// import Button from './ui/button'
// import { RiMenu4Fill } from 'react-icons/ri'

export default function Navbar() {
	const { hasLogin, hasPermission, logout } = useAuth()

	return (
		<nav className='flex h-16 w-full items-center bg-slate-800 px-4 text-gray-300 shadow sm:px-10'>
			<h1 className='text-lg font-bold md:text-2xl'>
				<Link href='/'>器材借用系統</Link>
			</h1>

			{/* <Button
				size='icon'
				variant='ghost'
				className='ml-auto sm:hidden'
				onClick={() => setIsOpen(true)}
			>
				<RiMenu4Fill className='h-6 w-6' />
			</Button> */}

			<ul className='ml-auto flex space-x-8'>
				{hasLogin() ? (
					<>
						<li>
							<Link href='/lends'>借用紀錄</Link>
						</li>
						<li>
							<Button variant='ghost' style={{ padding: 0, height: 0 }} onClick={logout}>
								登出
							</Button>
						</li>
						{hasPermission('admin') && (
							<li>
								<Link href='/manage'>網站管理</Link>
							</li>
						)}
					</>
				) : (
					<li>
						<Link href='/login'>登入</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}
