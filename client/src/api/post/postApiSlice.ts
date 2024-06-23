import {api} from "../api";
import {IPost} from "../../models/IPost";

export const postApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllPosts:  builder.query<IPost[], void>({
			query: () => ({
				url: '/posts',
				method: 'get',
			}),
			providesTags: ['Post']
		}),
		publish: builder.mutation<void, { title: string; description: string; }>({
			query: (credentials) => ({
				url: '/publish',
				method: 'post',
				data: credentials
			}),
			invalidatesTags: ['Post'],
		}),
		like: builder.mutation({
			query: postId => ({
				url: `/like/${postId}`,
				method: 'POST',
			}),
			invalidatesTags: ['Post'],
		}),
		delete: builder.mutation({
			query: postId => ({
				url: `/delete/${postId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Post'],
		}),
		edit: builder.mutation({
			query: ({credentials, postId}) => ({
				url: `/edit/${postId}`,
				method: 'PATCH',
				data: credentials
			}),
			invalidatesTags: ['Post'],
		})
	}),
});

export const {
	useGetAllPostsQuery,
	usePublishMutation,
	useLikeMutation,
	useDeleteMutation,
	useEditMutation
} = postApi;