import { createContext, useContext, useState } from 'react'

type Assets = {
	id: number
	name: string
	amount: 0
}

type AssetsContextType = {
	assets: Assets[]
	setAssets: (assets: Assets[]) => void
}

export const AssetsContext = createContext<AssetsContextType | undefined>(undefined)

type AssetsProviderProps = {
	children: React.ReactNode
}

export const AssetsProvider = ({ children }: AssetsProviderProps) => {
	const [assets, setAssets] = useState<Assets[]>([])

	return <AssetsContext.Provider value={{ assets, setAssets }}>{children}</AssetsContext.Provider>
}
export const useAssets = () => {
	const context = useContext(AssetsContext)
	if (!context) {
		throw new Error('useUsers must be used within a UserProvider')
	}
	return context
}
