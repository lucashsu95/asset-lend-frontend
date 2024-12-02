import { AlertDialog } from '@/api/ApiResponse'
import Loading from '@/components/Loading'
import Button from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Lend, useLends } from '@/contexts/LendsContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import React from 'react'

export default function Home() {
	const router = useRouter()
	const { hasLogin, loading } = useAuth()
	const [currentLends, setCurrentLends] = useState<Lend[]>([])
	const { currentUser } = useAuth()
	const { lends } = useLends() // 串後端時不可以有這行

	useEffect(() => {
		if (loading) return
		if (!hasLogin()) {
			AlertDialog('error', '請先登入')
			router.push('/login')
			return
		}

		setCurrentLends(lends.filter((lend) => lend.user_name === currentUser?.name))
	}, [currentUser?.name, hasLogin, lends, loading, router])

	if (loading) {
		return <Loading />
	}

	return (
		<div className='mx-auto max-w-[1000px] p-6'>
			<h1 className='text-center text-2xl font-bold sm:text-left'>借用紀錄</h1>

			<section className='mt-4'>
				<div className='custom-table min-w-[500px] *:grid-cols-[2fr_1fr_2fr_1fr]'>
					<div className='custom-table-row bg-slate-300 *:py-2'>
						<h2>
							<span>借用日期 / 器材名稱</span>
						</h2>
						<h2>
							<span>借用數量</span>
						</h2>
						<h2>
							<span>歸還日期</span>
						</h2>
						<h2>
							<span>操作</span>
						</h2>
					</div>
					{currentLends.map((lend) => (
						<React.Fragment key={lend.id}>
							<div className='custom-table-row bg-slate-200 *:py-1'>
								<div>{lend.lend_date}</div>
							</div>
							{lend.lend_assets.map((asset, index) => (
								<div key={`asset-${index}`} className='custom-table-row *:py-1'>
									<div>{asset.asset_name}</div>
									<div>{asset.lend_amount}</div>
									<div className='flex gap-2'>{asset.return_date ?? '尚未歸還'}</div>
									<div className='flex gap-2'>
										<Button variant='success'>歸還</Button>
									</div>
								</div>
							))}
						</React.Fragment>
					))}
				</div>
			</section>
		</div>
	)
}
