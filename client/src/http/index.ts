import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export const API_URL = `http://localhost:5000/api`

const _api= axios.create({
	withCredentials: true,
	baseURL: API_URL
});

_api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
});

_api.interceptors.response.use(config => {
	return config;
}, async (error) => {
	const originalRequest = error.config;
	if (error.response.status == 401 && !error.config._isRetry){
		originalRequest._isRetry = true;
		try {
			const response = await axios.get<AuthResponse>(
				`${API_URL}/refresh`, {withCredentials: true}
			)
			localStorage.setItem('token', response.data.accessToken);
			return _api.request(originalRequest);
		} catch (e) {
			console.log('Not Authorized')
		}
	}
	throw error;
})

export default _api;