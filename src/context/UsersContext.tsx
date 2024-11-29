import { createContext, ReactNode, useState } from 'react'

type User = {
	id: number
	account: string
	password: string
	role: string,
	access_token:string
}

type UserContextType = {
	users: User[]
	setUsers: (users: User[]) => void
	addUser: (user: User) => void
	deleteUser: (id: number) => void
	updateUser: (id: number, updatedUser: User) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

type UserProviderProps = {
	children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [users, setUsers] = useState<User[]>([])

	const addUser = (user: User) => {
		setUsers([...users, user])
	}

	const deleteUser = (id: number) => {
		setUsers(users.filter((user) => user.id !== id))
	}

	const updateUser = (id: number, updatedUser: User) => {
		setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
	}

	return (
		<UserContext.Provider value={{ users, setUsers, addUser, deleteUser, updateUser }}>
			{children}
		</UserContext.Provider>
	)
}
