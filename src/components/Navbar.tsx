import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function Navbar() {
	const { hasLogin, hasPermission } = useAuth()
	return (
		<nav className='flex h-16 w-full items-center bg-slate-800 px-10 text-gray-300 shadow'>
			<h1 className='text-lg font-bold md:text-2xl'>
				<Link href='/'>體育器材借用系統</Link>
			</h1>
			<ul className='ml-auto flex space-x-8'>
				{hasLogin() ? (
					<>
						<li>
							<Link href='/lends'>借用紀錄</Link>
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
