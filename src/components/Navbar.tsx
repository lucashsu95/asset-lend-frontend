import Link from 'next/link'

export default function Navbar() {
	return (
		<nav className='flex h-16 w-full items-center bg-gray-100 px-10 shadow'>
			<h1 className='text-2xl font-bold'>體育器才借用系統</h1>
			<ul className='ml-auto flex space-x-8'>
				<li>
					<Link href='/'>借用器才</Link>
				</li>
				<li>
					<Link href='/manage'>網站管理</Link>
				</li>
			</ul>
		</nav>
	)
}