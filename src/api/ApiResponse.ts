import Swal from 'sweetalert2'

const ALERT_DIALOG_TYPE = {
	MSG_INVALID_LOGIN: '無效的登錄',
	MSG_USER_EXISTS: '用戶已存在',
	MSG_PASSWORD_NOT_SECURE: '密碼不安全',
	MSG_INVALID_ACCESS_TOKEN: '無效的訪問令牌',
	MSG_PERMISSION_DENY: '權限被拒絕',
	MSG_MISSING_FIELD: '請填寫所有欄位',
	MSG_WRONG_DATA_TYPE: '數據類型錯誤',
	MSG_POST_NOT_EXISTS: '帖子不存在',
	MSG_COMMENT_NOT_EXISTS: '評論不存在',
	MSG_USER_NOT_EXISTS: '用戶不存在',
	MSG_INVALID_VALUE: '無效的值',
	MSG_PLAYER_NOT_EXISTS: '播放器不存在',
	MSG_INVALID_FILE_FORMAT: '無效的文件格式',
	MSG_EMAIL_EXISTS: '電子郵件已存在',
	MSG_CATEGORY_EXISTS: '類別已存在',
	MSG_CATEGORY_NOT_EXISTS: '類別不存在',
	MSG_PRODUCT_NOT_EXISTS: '產品不存在',
	MSG_ORDER_NOT_EXISTS: '訂單不存在',
	MSG_ORDER_CLOSED: '訂單已關閉',
	MSG_PRODUCT_QUANTITY_INSUFFICIENT: '產品數量不足',

	success: '成功',
	error: '錯誤'
}

type ApiError = {
	response: {
		data: {
			message: string
		}
	}
}

export function AlertDialog(
	type: 'success' | 'error',
	msg: ApiError | string | null = null,
	textType: 'text' | 'html' = 'text'
): void {
	let message
	if (typeof msg === 'object') {
		message = msg?.response?.data?.message
	} else if (typeof msg === 'string') {
		message = msg
	} else {
		message = '未知錯誤'
	}

	let text
	if (textType === 'html') {
		text = { html: message }
	} else {
		text = { text: message }
	}

	Swal.fire({
		icon: type,
		title: ALERT_DIALOG_TYPE[type],
		confirmButtonText: 'OK',
		...text
	})
}

type ApiResponse<T> = {
	data: T
}

export const handleApiResponse = <T>(
	apiCall: () => Promise<ApiResponse<T>>,
	onSuccess?: (response: ApiResponse<T>) => void,
	onError?: (error: ApiError) => void
) => {
	return async () => {
		try {
			const response = await apiCall()
			AlertDialog('success', null)
			if (onSuccess) onSuccess(response)
		} catch (error) {
			AlertDialog('error', (error as ApiError) || { response: { data: { message: '操作失敗' } } })
			if (onError) onError(error as ApiError)
		}
	}
}
