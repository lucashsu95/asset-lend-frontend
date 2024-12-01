import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Asset = {
	id: number
	name: string
	img: string
	amount: number // 總數量
	remain: number // 剩餘數量
}

export interface AddAssetFormData {
	name: string
	img: string
	amount: number
}

export interface EditAssetFormData extends AddAssetFormData {
	id: number
	remain?: number
}

type AssetsContextType = {
	assets: Asset[]
	addAsset: (asset: AddAssetFormData) => void
	deleteAsset: (id: number) => void
	updateAsset: (id: number, updatedAsset: EditAssetFormData) => void
}

export const AssetsContext = createContext<AssetsContextType | undefined>(undefined)

type AssetsProviderProps = {
	children: React.ReactNode
}

export const AssetsProvider = ({ children }: AssetsProviderProps) => {
	const [assets, setAssets] = useState<Asset[]>([])

	const addAsset = (asset: AddAssetFormData) => {
		const newAsset = {
			...asset,
			id: new Date().getTime(),
			remain: asset.amount,
			img: 'https://picsum.photos/200'
		}
		setAssets((prev) => [...prev, newAsset])
	}

	const deleteAsset = (id: number) => {
		setAssets(assets.filter((asset) => asset.id !== id))
	}

	const updateAsset = (id: number, updatedAsset: EditAssetFormData) => {
		setAssets(assets.map((asset) => (asset.id === id ? { ...asset, ...updatedAsset } : asset)))
	}

	const seederAssets = useCallback(() => {
		const assetNames = ['籃球', '排球', '羽球拍', '羽毛球', '網球', '網球拍', '桌球拍', '乒乓球']
		for (const [i, name] of assetNames.entries()) {
			setAssets((prev) => [
				...prev,
				{
					id: i + 1,
					name: name,
					amount: 5,
					remain: 5,
					img: 'https://picsum.photos/200'
				}
			])
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
