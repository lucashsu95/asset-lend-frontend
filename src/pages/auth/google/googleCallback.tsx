import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '@/context/UsersContext'

export default function GoogleCallback() {
	const router = useRouter()
	const userContext = useContext(UserContext)

	useEffect(() => {
		fetch(`http://localhost:8000/api/auth/google/callback${location.search}`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				data.user.access_token = data?.access_token

				// 要把 user 存到 context 裡

				console.log(data.user)
				if (userContext) {
					userContext.addUser(data.user)
				}
				router.push({
					pathname: '/'
				})
			})
	}, [router, userContext])
}
