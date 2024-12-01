import { createContext, useContext, useState, ReactNode } from 'react'

export type SelectedAsset = {
	id: number
	name: string
	img: string
	lend_amount: number
}

export type EditSelectedAssetData = {
	name: string
	img: string
	lend_amount: number
}

type SelectedAssetsContextType = {
	selectedAssets: SelectedAsset[]
	editSelectedAssetAmount: ({ name, img, lend_amount }: EditSelectedAssetData) => void
	clearAssets: () => void
}

const SelectedAssetsContext = createContext<SelectedAssetsContextType | undefined>(undefined)

export const SelectedAssetsProvider = ({ children }: { children: ReactNode }) => {
	const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([])

	const editSelectedAssetAmount = ({ name, img, lend_amount }: EditSelectedAssetData) => {
		if (selectedAssets.find((asset) => asset.name === name)) {
			setSelectedAssets(
				selectedAssets.map((asset) => (asset.name === name ? { ...asset, lend_amount } : asset))
			)
		} else {
			setSelectedAssets((prev) => [...prev, { id: new Date().getTime(), name, img, lend_amount }])
		}
		setSelectedAssets((prev) => prev.filter((asset) => asset.lend_amount > 0))
	}

	const clearAssets = () => {
		setSelectedAssets([])
	}

	return (
		<SelectedAssetsContext.Provider
			value={{ selectedAssets, editSelectedAssetAmount, clearAssets }}
		>
			{children}
		</SelectedAssetsContext.Provider>
	)
}

export const useSelectedAssets = () => {
	const context = useContext(SelectedAssetsContext)
	if (!context) {
		throw new Error('useSelectedAssets must be used within a SelectedAssetsProvider')
	}
	return context
}
