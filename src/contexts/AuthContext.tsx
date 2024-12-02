import { createContext, useContext, useState, useCallback, useEffect } from 'react'

type CurrentUser = {
	id: number
	name: string
	role: string
}

export interface LoginFormData {
	email: string
	password: string
}

export interface SignUpFormData extends LoginFormData {
	name: string
}

type AuthContextType = {
	currentUser: CurrentUser | null
	loading: boolean
	login: (user: LoginFormData) => void
	signUp: (user: SignUpFormData) => void
	logout: () => void
	checkToken: () => void
	hasLogin: () => boolean
	hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
	const [loading, setLoading] = useState(true)

	const login = (user: LoginFormData) => {
		// 打api
		setCurrentUser({ ...user, id: new Date().getTime(), name: 'John Doe', role: 'admin' })
		localStorage.setItem('asset-lend-auth-token', 'token')
	}

	const signUp = (user: SignUpFormData) => {
		// 打api

		setCurrentUser({ ...user, id: new Date().getTime(), role: 'user' })
		localStorage.setItem('asset-lend-auth-token', 'token')
	}

	const logout = () => {
		// 打api
		setCurrentUser(null)
		localStorage.removeItem('asset-lend-auth-token')
	}

	const hasLogin = () => !!currentUser

	const hasPermission = (permission: string) =>
		currentUser?.role === permission || currentUser?.role === 'admin'

	const checkToken = useCallback(async () => {
		// 打api
		// const token = localStorage.getItem('token');
		// if (token) {
		//   try {
		//     // const response = await fetch('/api/check-token', {
		//     //   method: 'POST',
		//     //   headers: {
		//     //     'Content-Type': 'application/json',
		//     //     'Authorization': `Bearer ${token}`
		//     //   }
		//     // });
		//     if (response.ok) {
		//       const data = await response.json();
		//       setCurrentUser({
		//         user_id: data.user_id,
		//         user_name: data.user_name,
		//         role: data.role
		//       });
		//     } else {
		//       setCurrentUser(null);
		//     }
		//   } catch (error) {
		//     console.error('Error checking token:', error);
		//     setCurrentUser(null);
		//   }
		// } else {
		//   setCurrentUser(null);
		// }
	}, [])

	useEffect(() => {
		setTimeout(() => {
			login({ email: 'admin@web.tw', password: '1234' })
			setLoading(false)
		}, 1000)
	}, [checkToken])

	return (
		<AuthContext.Provider
			value={{ currentUser, loading, login, logout, checkToken, signUp, hasLogin, hasPermission }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
