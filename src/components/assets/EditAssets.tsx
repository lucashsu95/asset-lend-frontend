import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/button'
import Form from '@/components/ui/form'
import { AddAssetFormData, useAssets } from '@/contexts/AssetsContext'
import { MdOutlineFileUpload } from 'react-icons/md'
import Image from 'next/image'

interface Props {
	assetId: number | null
	onClose: () => void
}

export default function EditAsset({ assetId, onClose }: Props) {
	const { assets, updateAsset, addAsset } = useAssets()
	const asset = assets.find((asset) => asset.id === assetId)
	const [preview, setPreview] = useState<string | null>(asset?.img || null)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<AddAssetFormData>({
		defaultValues: {
			name: asset?.name || '',
			img: asset?.img || '',
			amount: asset?.amount || 0
		}
	})

	const onSubmit = (data: AddAssetFormData) => {
		const imgFile = data.img[0]
		console.log(data, imgFile)

		if (assetId) {
			const newData = { ...data, id: assetId }
			updateAsset(assetId, newData)
		} else {
			addAsset(data)
		}
		onClose()
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				title={assetId ? '編輯體育器材' : '新增體育器材'}
				className='h-[400px] px-2 py-0 shadow-none sm:w-[350px]'
			>
				<div>
					<label className='input flex items-center text-gray-700' htmlFor='file-input'>
						<MdOutlineFileUpload className='mr-2 h-5 w-5' />
						上傳器材示意圖
					</label>
					<input
						id='file-input'
						type='file'
						className='hidden'
						{...register('img', {
							required: '必填欄位',
							onChange: handleImageChange
						})}
					/>
					{preview && (
						<Image
							width={100}
							height={100}
							src={preview}
							alt='預覽圖片'
							className='mt-2 h-20 w-20 object-cover'
						/>
					)}
					{errors.img && <p className='text-red-500'>{errors.img.message}</p>}
				</div>
				<div>
					<label className='block text-gray-700'>器材名稱</label>
					<input
						type='text'
						className='input'
						{...register('name', {
							required: '必填欄位'
						})}
					/>
					{errors.name && <p className='text-red-500'>{errors.name.message}</p>}
				</div>
				<div>
					<label className='block text-gray-700'>數量</label>
					<input
						type='number'
						className='input'
						{...register('amount', {
							required: '必填欄位',
							valueAsNumber: true
						})}
					/>
					{errors.amount && <p className='text-red-500'>{errors.amount.message}</p>}
				</div>
				<Button type='submit'>{assetId ? '更新' : '新增'}</Button>
			</Form>
		</div>
	)
}
