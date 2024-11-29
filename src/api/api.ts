import { generateApi } from 'axios-api-gen'
import axios from 'axios'

const API_PREFIX = process.env.NEXT_PUBLIC_API_URL
const axiosInstance = axios.create({
	baseURL: API_PREFIX,
	headers: {
		'Content-Type': 'application/json'
	}
})

const endpoints = {
	postLogin: 'auth/login', // 登入
	postLogout: 'auth/logout', // 登出
	getGoogleLogin: 'auth/google', // google 登入
	getCheckToken: 'auth/check_access_token' // 檢查 token 是否有效

	// users
	// postSignup: 'users/signup', // 註冊一般食客
	// getUsers: 'users',
	// postUser: 'users',
	// putUser: 'users/:id',
	// deleteUser: 'users/:id',
	// getUsersById: 'users/:id',
}

export default generateApi(endpoints, {
	axiosInstance,
	beforeHandler() {
		console.log('before')
		// const state = store.getState()
		// const profile = state.profile
		// if (profile.access_token) {
		//   axiosInstance.defaults.headers.common.Authorization = `Bearer ${profile.access_token}`
		// } else {
		//   delete axiosInstance.defaults.headers.common.Authorization
		// }
		// load.value = true
	},
	afterHandler() {
		console.log('after')
		// load.value = false
	}
})
