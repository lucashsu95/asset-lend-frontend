import { createContext, useContext, useState, ReactNode } from 'react'

export type EditSelectedAssetData = {
	asset_id: number
	name: string
	img: string
	lend_amount: number
}

export interface SelectedAsset extends EditSelectedAssetData {
	id: number
}

type SelectedAssetsContextType = {
	selectedAssets: SelectedAsset[]
	editSelectedAssetAmount: ({ name, img, lend_amount, asset_id }: EditSelectedAssetData) => void
	clearSelected: () => void
}

const SelectedAssetsContext = createContext<SelectedAssetsContextType | undefined>(undefined)

export const SelectedAssetsProvider = ({ children }: { children: ReactNode }) => {
	const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([])

	const editSelectedAssetAmount = ({ asset_id, name, img, lend_amount }: EditSelectedAssetData) => {
		if (selectedAssets.find((asset) => asset.name === name)) {
			setSelectedAssets(
				selectedAssets.map((asset) => (asset.name === name ? { ...asset, lend_amount } : asset))
			)
		} else {
			setSelectedAssets((prev) => [
				...prev,
				{ id: new Date().getTime(), asset_id, name, img, lend_amount }
			])
		}
		setSelectedAssets((prev) => prev.filter((asset) => asset.lend_amount > 0))
	}

	const clearSelected = () => {
		setSelectedAssets([])
	}

	return (
		<SelectedAssetsContext.Provider
			value={{ selectedAssets, editSelectedAssetAmount, clearSelected }}
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
