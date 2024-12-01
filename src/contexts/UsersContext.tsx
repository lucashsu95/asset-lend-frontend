import { createContext, ReactNode, useState, useContext, useCallback, useEffect } from 'react'

type User = {
	id: number
	email: string
	name: string
	role: string
	access_token: string | null
}

export interface AddUserFormData {
	name: string
	email: string
	password: string
	role: string
}

export interface EditUserFormData extends AddUserFormData {
	id: number
}

type UserContextType = {
	users: User[]
	addUser: (user: AddUserFormData) => void
	deleteUser: (id: number) => void
	updateUser: (id: number, updatedUser: EditUserFormData) => void
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
			name: 'admin',
			role: '管理員',
			access_token: null
		}
	])

	const addUser = (user: AddUserFormData) => {
		setUsers((prev) => [...prev, { ...user, id: new Date().getTime(), access_token: null }])
	}

	const deleteUser = (id: number) => {
		setUsers(users.filter((user) => user.id !== id))
	}

	const updateUser = (id: number, updatedUser: EditUserFormData) => {
		setUsers(users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)))
	}

	const seederUsers = useCallback((num: number) => {
		for (let i = 0; i < num; i++) {
			setUsers((prev) => [
				...prev,
				{
					id: i + 2,
					name: `user${i + 1}`,
					email: `user${i + 1}@web.tw`,
					role: '使用者',
					access_token: null
				}
			])
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
