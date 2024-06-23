import { AuthResponse } from '../../models/response/AuthResponse';
import {IUser} from "../../models/IUser";
import {api} from "../api";
export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse, { email: string, password: string }>({
			query: (credentials) => ({
				url: '/login',
				method: 'post',
				data: credentials,
			}),
		}),
		registration: builder.mutation<AuthResponse, { email: string, password: string; nickname: string }>({
			query: (credentials) => ({
				url: '/registration',
				method: 'post',
				data: credentials,
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'post',
			}),
		}),
		getAllUsers: builder.query<IUser[], void>({
			query: () => ({
				url: '/users',
				method: 'get',
			}),
			providesTags: ['User'],
		}),
		getUser: builder.query({
			query: nickname => ({
				url: `/user/${nickname}`,
				method: 'GET',
			}),
		}),
		refresh: builder.query<AuthResponse, void>({
			query: (credentials) => ({
				url: '/refresh',
				method: 'get',
				data: credentials,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegistrationMutation,
	useLogoutMutation,
	useRefreshQuery,
	useGetAllUsersQuery,
	useGetUserQuery
} = authApi;