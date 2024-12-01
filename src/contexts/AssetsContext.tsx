import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Asset = {
	id?: number
	name: string
	amount: number
}

type AssetsContextType = {
	assets: Asset[]
	addAsset: (asset: Asset) => void
	deleteAsset: (id: number) => void
	updateAsset: (id: number, updatedAsset: Asset) => void
}

export const AssetsContext = createContext<AssetsContextType | undefined>(undefined)

type AssetsProviderProps = {
	children: React.ReactNode
}

export const AssetsProvider = ({ children }: AssetsProviderProps) => {
	const [assets, setAssets] = useState<Asset[]>([])

	const addAsset = (asset: Asset) => {
		setAssets((prev) => [...prev, asset])
	}

	const deleteAsset = (id: number) => {
		setAssets(assets.filter((asset) => asset.id !== id))
	}

	const updateAsset = (id: number, updatedAsset: Asset) => {
		setAssets(assets.map((asset) => (asset.id === id ? { ...asset, ...updatedAsset } : asset)))
	}

	const seederAssets = useCallback(() => {
		const assetNames = ['籃球', '排球', '羽球拍', '羽毛球', '網球', '網球拍', '桌球拍', '乒乓球']
		for (const [i, name] of assetNames.entries()) {
			addAsset({
				id: i + 1,
				name: name,
				amount: 5
			})
		}
	}, [])

	useEffect(() => {
		seederAssets()
	}, [seederAssets])

	return (
		<AssetsContext.Provider value={{ assets, addAsset, deleteAsset, updateAsset }}>
			{children}
		</AssetsContext.Provider>
	)
}

export const useAssets = () => {
	const context = useContext(AssetsContext)
	if (!context) {
		throw new Error('useAssets must be used within a AssetProvider')
	}
	return context
}
