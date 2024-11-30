import Link from 'next/link'

export default function Navbar() {
	return (
		<nav className='flex h-16 w-full items-center bg-slate-800 px-10 text-gray-300 shadow'>
			<h1 className='font-bold md:text-2xl'>體育器材借用系統</h1>
			<ul className='ml-auto flex space-x-8'>
				<li>
					<Link href='/manage'>網站管理</Link>
				</li>
			</ul>
		</nav>
	)
}
