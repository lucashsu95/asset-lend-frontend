import { createContext, useState } from 'react'

type Sport = {
	id: number
	name: string
	amount: 0
}

type SportsContextType = {
	sports: Sport[]
	setSports: (sports: Sport[]) => void
}

export const SportsContext = createContext<SportsContextType | undefined>(undefined)

type SportsProviderProps = {
	children: React.ReactNode
}

export const SportsProvider = ({ children }: SportsProviderProps) => {
	const [sports, setSports] = useState<Sport[]>([])

	return <SportsContext.Provider value={{ sports, setSports }}>{children}</SportsContext.Provider>
}
