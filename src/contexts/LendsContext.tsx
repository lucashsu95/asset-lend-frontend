import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Lend = {
	id?: number
	user_name: string
	lend_assets: lend_asset[]
	lend_date: string
	return_date?: string | null
}

type lend_asset = {
	asset_id: number
	asset_name: string
	lend_amount: number
}

type LendsContextType = {
	lends: Lend[]
	addLend: (lend: Lend) => void
	deleteLend: (id: number) => void
	updateLend: (id: number, updatedLend: Lend) => void
}

export const LendsContext = createContext<LendsContextType | undefined>(undefined)

type LendsProviderProps = {
	children: React.ReactNode
}

export const LendsProvider = ({ children }: LendsProviderProps) => {
	const [lends, setLends] = useState<Lend[]>([])

	const addLend = (lend: Lend) => {
		setLends((prev) => [...prev, lend])
	}

	const deleteLend = (id: number) => {
		setLends(lends.filter((lend) => lend.id !== id))
	}

	const updateLend = (id: number, updatedLend: Lend) => {
		setLends(lends.map((lend) => (lend.id === id ? { ...lend, ...updatedLend } : lend)))
	}

	const formatDateTime = (second: number) => {
		const date = new Date(second)
		const year = date.getFullYear()
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const day = date.getDate().toString().padStart(2, '0')
		const hour = date.getHours().toString().padStart(2, '0')
		const minute = date.getMinutes().toString().padStart(2, '0')
		const s = date.getSeconds().toString().padStart(2, '0')
		return `${year}-${month}-${day} ${hour}:${minute}:${s}`
	}

	const seederLends = useCallback(() => {
		const lendDates = ['2024-12-01', '2024-11-28', '2024-11-25', '2023-11-28', '2023-11-11']
		const assetNames = ['籃球', '排球', '羽球拍', '羽毛球', '網球', '網球拍', '桌球拍', '乒乓球']
		for (let i = 0; i < 10; i++) {
			const lend_assets =
				i % 3 === 0
					? [
							{
								asset_id: Math.floor(Math.random() * 8) + 1,
								asset_name: assetNames[Math.floor(Math.random() * 8)],
								lend_amount: Math.floor(Math.random() * 5) + 1
							}
						]
					: [
							{
								asset_id: Math.floor(Math.random() * 8) + 1,
								asset_name: assetNames[Math.floor(Math.random() * 8)],
								lend_amount: Math.floor(Math.random() * 5) + 1
							},
							{
								asset_id: Math.floor(Math.random() * 8) + 1,
								asset_name: assetNames[Math.floor(Math.random() * 8)],
								lend_amount: Math.floor(Math.random() * 5) + 1
							}
						]
			const lend_date = formatDateTime(
				new Date(lendDates[Math.floor(Math.random() * 5)]).getTime() +
					Math.random() * 60 * 60 * 1000
			)
			const return_date =
				i % 4 === 0
					? formatDateTime(
							new Date(lend_date).getTime() + (Math.random() < 0.5 ? 1 : 2) * 60 * 60 * 1000
						)
					: null
			addLend({
				id: i + 1,
				user_name: `使用者${Math.floor(Math.random() * 5) + 1}`,
				lend_date: lend_date,
				return_date: return_date,
				lend_assets: lend_assets
			})
		}
	}, [])

	useEffect(() => {
		seederLends()
	}, [seederLends])

	return (
		<LendsContext.Provider value={{ lends, addLend, deleteLend, updateLend }}>
			{children}
		</LendsContext.Provider>
	)
}

export const useLends = () => {
	const context = useContext(LendsContext)
	if (!context) {
		throw new Error('useLends must be used within a LendProvider')
	}
	return context
}
