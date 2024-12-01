import { useForm } from 'react-hook-form'
import Button from '@/components/ui/button'
import Form from '@/components/ui/form'
import { useAssets } from '@/contexts/AssetsContext'

interface FormData {
	id?: number
	name: string
	amount: number
}

interface Props {
	assetId: number | null
	onClose: () => void
}

export default function EditUser({ assetId, onClose }: Props) {
	const { assets, updateAsset, addAsset } = useAssets()
	const asset = assets.find((asset) => asset.id === assetId)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		defaultValues: {
			name: asset?.name || '',
			amount: asset?.amount || 0
		}
	})

	const onSubmit = (data: FormData) => {
		if (assetId) {
			updateAsset(assetId, data)
		} else {
			data.id = new Date().getTime()
			addAsset(data)
		}
		onClose()
	}

	return (
		<div>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				title={assetId ? '編輯體育器材' : '新增體育器材'}
				className='h-[400px] px-2 py-0 shadow-none sm:w-[350px]'
			>
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
							min: { value: 0, message: '數量不能小於0' }
						})}
					/>
					{errors.amount && <p className='text-red-500'>{errors.amount.message}</p>}
				</div>
				<Button type='submit'>儲存</Button>
			</Form>
		</div>
	)
}
