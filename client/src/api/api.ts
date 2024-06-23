import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import _api, {API_URL} from "../http";
import {AxiosError, AxiosRequestConfig} from "axios";

export interface AxiosBaseQueryArgs {
	url: string;
	method: AxiosRequestConfig['method'];
	data?: AxiosRequestConfig['data'];
	params?: AxiosRequestConfig['params'];
}

const axiosBaseQuery =
	({ baseUrl }: { baseUrl: string }): BaseQueryFn<AxiosBaseQueryArgs> =>
		async ({ url, method, data, params }) => {
			try {
				const result = await _api({ url: baseUrl + url, method, data, params });
				return { data: result.data };
			} catch (axiosError) {
				let err = axiosError as AxiosError;

				return {
					error: {
						status: err.response?.status,
						data: err.response?.data || err.message,
					},
				};
			}
		};

export const api = createApi({
	reducerPath: 'authApi',
	baseQuery: axiosBaseQuery({
		baseUrl: API_URL
	}),
	tagTypes: ['Post', 'User'],
	endpoints: () => ({})
})

