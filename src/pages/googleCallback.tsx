import { useEffect } from 'react'
import { useRouter } from 'next/router'


export default function GoogleCallback() {
	const router = useRouter()

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

        console.log(data.user);
        
				router.push({
					pathname: '/'
				})
			})
	}, [router])
}
