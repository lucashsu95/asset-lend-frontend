import { createContext, ReactNode, useState, useContext, useCallback, useEffect } from 'react'

type User = {
	id?: number
	email: string
	password?: string
	role: string
	access_token?: string
}

type UserContextType = {
	users: User[]
	addUser: (user: User) => void
	deleteUser: (id: number) => void
	updateUser: (id: number, updatedUser: User) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

type UserProviderProps = {
	children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [users, setUsers] = useState<User[]>([
		{
			id: 1,
			email: 'admin@web.tw',
			role: '管理員'
		}
	])

	const addUser = (user: User) => {
		setUsers((prev) => [...prev, user])
	}

	const deleteUser = (id: number) => {
		setUsers(users.filter((user) => user.id !== id))
	}

	const updateUser = (id: number, updatedUser: User) => {
		setUsers(users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)))
	}

	const seederUsers = useCallback((num: number) => {
		for (let i = 0; i < num; i++) {
			addUser({
				id: i + 2,
				email: `user${i + 1}@web.tw`,
				role: '使用者'
			})
		}
	}, [])

	useEffect(() => {
		seederUsers(8)
	}, [seederUsers])

	return (
		<UserContext.Provider value={{ users, addUser, deleteUser, updateUser }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUsers = () => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('useUsers must be used within a UserProvider')
	}
	return context
}
